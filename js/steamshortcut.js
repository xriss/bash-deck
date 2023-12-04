#!/usr/bin/env node

const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');

const VDF = require("steam-binary-vdf");
const crc32 = require('crc32');


const minimist = require("minimist")
const args = minimist(process.argv.slice(2),{boolean:true})


/*

do something with images?

/home/deck/.local/share/Steam/appcache/librarycache/

	{id}_header.jpg",			 460 x 215
	{id}_icon.jpg",				  32 x  32
	{id}_library_600x900.png",	 300 × 450
	{id}_library_hero.png",		1920 × 620


*/


// no idea why this is what everyone else does...
let gene_id=function( exe , name )
{
  const key = "" + exe + name
  const top = BigInt( Number("0x"+crc32(key)) ) | BigInt(0x80000000)
  return String( (BigInt(top) << BigInt(32) | BigInt(0x02000000)) )
}

// get list of all steam users userdata directories
let get_userdata_paths=function(user)
{
	let ret=[]
	let base=path.join( os.homedir() , ".local/share/Steam/userdata" )
	let dirs=fs.readdirSync(base)
	for(let dir of dirs)
	{
		if((!user)||(user==dir))
		{
			ret.push( path.resolve( path.join( base , dir ) ) )
		}
	}
	return ret
}

let sc_default=function()
{
	return {
		appid: undefined,
		appname: '',
		exe: '',
		StartDir: '',
		icon: '',
		ShortcutPath: '',
		LaunchOptions: '',
		IsHidden: 0,
		AllowDesktopConfig: 1,
		AllowOverlay: 1,
		OpenVR: 0,
		Devkit: 0,
		DevkitGameID: '',
		DevkitOverrideAppID: 0,
		LastPlayTime: 0,
		FlatpakAppID: '',
		tags: {}
	}
}
let sc_set=function(sc)
{
	let map={
		"app-id":                 "appid",
		"app-name":               "appname",
		"exe":                    "exe",
		"start-dir":              "StartDir",
		"icon":                   "icon",
		"shortcut-path":          "ShortcutPath",
		"launch-options":         "LaunchOptions",
		"is-hidden":              "IsHidden",
		"allow-desktop-config":   "AllowDesktopConfig",
		"allow-overlay":          "AllowOverlay",
		"open-vr":                "OpenVR",
		"devkit":                 "Devkit",
		"devkit-game-id":         "DevkitGameID",
		"devkit-override-app-id": "DevkitOverrideAppID",
		"last-play-time":         "LastPlayTime",
		"flatpak-app-id":         "FlatpakAppID",
		"tags":                   "tags",
	}
	
	sc=sc || {}
	
	for(let ko in map)
	{
		let ks=map[ko]

		let v=args[ko] // option value
		if(v!==undefined) // exists
		{
			if( String(Number(v)) == String(v) ) { v=Number(v) } // auto cast to number
			sc[ks]=v // save value
		}
	}
	
	return sc
}
let sc_find=function(list,sc)
{
	let idx=-1
	for(let i in list)
	{
		let v=list[i]
		if(sc.appid!==undefined)
		{
			if(sc.appid==v.appid) // find appid if given
			{
				idx=i
				break
			}
		}
		else // search
		if( ( v.appname == sc.appname ) && ( v.exe == sc.exe ) ) // find combo
		{
			idx=i
			break
		}
	}
	return idx
}
let sc_get=function(list,sc)
{
	let idx=sc_find(list,sc)
	return list[idx]
}
let sc_cut=function(list,sc)
{
	let idx=sc_find(list,sc)
	if(idx>=0)
	{
		list.splice(idx,1) // remove from list
	}
	return list[idx]
}
let sc_paste=function(list,sc)
{
	let idx=sc_find(list,sc)

	if(!sc.appid)
	{
		sc.appid=gene_id(sc.appname,sc.exe)
	}

	if(idx>=0)
	{
		list[idx]=sc //  replace
	}
	else
	{
		list.push(sc) //  add to end
	}
	return sc
}

let modify_vdf=function(act,opts)
{
	let paths=get_userdata_paths( args.user )
	if(paths.length==0)
	{
		console.error("steamshortcut.js userdata paths not found")
		process.exit(20)
	}
	let si=sc_set() // get input option values only
	if(act!="list")
	{
		if(!((si.appname)&&(si.exe)))
		{
			if(si.appid==undefined)
			{
				console.error("steamshortcut.js --app-name and --exe or just --app-id are required options")
				process.exit(20)
			}
		}
	}

	for(let base of paths)
	{
		let filename=path.join( base , "/config/shortcuts.vdf" )
		console.log( "modifying : " + filename )
		let data = VDF.readVdf( fs.readFileSync(filename) )
		let list=[] ; for(let n in data.shortcuts) { list[n]=data.shortcuts[n] }

		if(act=="add")
		{
			let sc=sc_default()
			sc_set(sc)
			sc_paste(list,sc)
			console.log("adding")
			console.log(sc)
		}
		else
		if(act=="remove")
		{
			let sc=sc_cut(list,si)
			console.log("removing")
			console.log(sc)
		}
		else
		if(act=="edit")
		{
			let sc=sc_get(list,si)
			if(!sc) { sc=sc_default() }
			sc_set(sc)
			sc_paste(list,sc)
			console.log("editing")
			console.log(sc)
		}
		
		if(act=="list")
		{
			console.log("listing")
			console.log(list)
		}
		else
		{
			data.shortcuts={} ; for( let n in list ) { data.shortcuts[ (""+n) ]=list[n] }
			fs.writeFileSync( filename , VDF.writeVdf(data) )
		}
	}
}

let cmd=args._[0] || "help"
if( cmd=="help" )
{
	console.log(`
steamshortcut.js
	Parse and adjust steam shortcuts. Note that this is intended for 
	steam deck and untested on windows.
	
	Ideally this should be run when steam is not active and steam needs 
	to be restarted for this to take effect.

--user=12345
	Specify the id of the user to modify, without this option we will 
	modify shortcuts for all users.

--app-id=
--app-name=
--exe=
--start-dir=
--icon=
--shortcut-path=
--launch-options=
--is-hidden=0
--allow-desktop-config=1
--allow-overlay=1
--open-vr=0
--devkit=0
--devkit-game-id=
--devkit-override-app-id=0
--last-play-time=0
--flatpak-app-id=

	Can all be used to set the appropriate value in the shortcut. An 
	app-id will be auto-generated if missing.
		
steamshortcut.js list
	List all steam shortcut values.

steamshortcut.js add --app-name="Show This Name" --exe="~/run_this.sh"
	Add a shortcut to steam. You must specify an app-name and exe or an 
	app-id.
	
steamshortcut.js remove --app-name="Show This Name" --exe="~/run_this.sh"
	Remove a shortcut from steam. You must specify an app-name and exe 
	or an app-id.

steamshortcut.js edit --app-name="Show This Name" --exe="~/run_this.sh"
	Edit a shortcut on steam. You must specify an app-name and exe or 
	an app-id.

steamshortcut.js help
	Show this help text.
`)
}
else
if( cmd=="list" )
{
	modify_vdf("list",{})
}
else
if( cmd=="add" )
{
	modify_vdf("add",{})
}
else
if( cmd=="edit" )
{
	modify_vdf("edit",{})
}
else
if( cmd=="remove" )
{
	modify_vdf("remove",{})
}
else
{
	console.error(`
steamshortcut.js unknown command
`)
	process.exit(20)
}

