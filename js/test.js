
const VDF = require("steam-binary-vdf");
const fs = require('node:fs');
    
let vdf_dat = fs.readFileSync('/home/kriss/.local/share/Steam/userdata/302758/config/shortcuts.vdf');
let data = VDF.readVdf(vdf_dat);

console.log(data);

let vdf_str = VDF.writeVdf(data);


