#!/usr/bin/env node

const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');

const VDF = require("steam-binary-vdf");
const crc32 = require('crc32');


const minimist = require("minimist")
const args = minimist(process.argv.slice(2),{boolean:true})


/*

let vdf_dat = fs.readFileSync('/home/deck/.local/share/Steam/userdata/302758/config/shortcuts.vdf');
let data = VDF.readVdf(vdf_dat);

console.log(data);

let vdf_str = VDF.writeVdf(data);
*/


// no idea why this is what everyone else does...
let gene_id=function( exe , name )
{
  const key = exe + name
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
		appid: 0,
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
let sc_find=function(list,sc)
{
	let idx=-1
	for(let i in list)
	{
		let v=list[i]
		if( ( v.appname == sc.appname ) && ( v.exe == sc.exe ) )
		{
			idx=i
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
		return list.slice(idx) // remove from list
	}
}
let sc_paste=function(list,sc)
{
	let idx=sc_find(list,sc)
	if(idx>=0)
	{
		list[idx]=sc //  replace
	}
	else
	{
		list.push(sc) //  add to end
	}
}

let modify_vdf=function(act,it)
{
	let paths=get_userdata_paths( args.user )
	if(paths.length==0)
	{
		console.error("steam userdata paths not found")
		process.exit(20)
	}
	for(let base of paths)
	{
		let filename=path.join( base , "/config/shortcuts.vdf" )
		console.log( "modifying : " + filename )
		let data = VDF.readVdf( fs.readFileSync(filename) )
		let list=[] ; for(let n in data.shortcuts) { list[n]=data.shortcuts[n] }



		
		console.log(list)
		data.shortcuts={} ; for( let n in list ) { data.shortcuts[ (""+n) ]=list[n] }
		fs.writeFileSync( filename , VDF.writeVdf(data) )
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
	to be restarted for this is take effect.

--user=12345
	Specify the id of the user to modify, without this option we will 
	modify shortcuts for all users.


steamshortcut.js add --name="Show This Name" --exe="~/run_this.sh"
	Add a shortcut to steam. You must specify a name and exe.
	
steamshortcut.js remove --name="Show This Name" --exe="~/run_this.sh"
	Remove a shortcut from steam. You must specify a name and exe.

steamshortcut.js edit --name="Show This Name" --exe="~/run_this.sh"
	Edit a shortcut on steam. You must specify a name and exe.

steamshortcut.js help
	Show this help text.
`)
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
	console.log(`
shortcut.js unknown command
`)
}

