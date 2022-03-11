# brukerToNMRIUM

Bruker to nmrium converter.

Takes as input, zip file, and returns a json string in the nmrium format.

Optionally parameters, flag for printing to FS and the resulting save path.

Usage: 
const fs = require("fs");
const brukerConversion = require("./brukerConversion.js");

const zipFile = fs.readFileSync("./zipDataPath.zip");
const convertedJSON = brukerConversion.brukerToNMRIUM(zipFile,true,"./JSONDataPath.json");
