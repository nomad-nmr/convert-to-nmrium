const brukerConversion = require('./src/brukerConversion')

module.exports = {
  //fromBrukerZip(inputPath, {save, outputPath})
  //function reads Bruker dataset compressed in a zip file and returns NMRium format object
  //that can be optionally saved as JASON in specified output path.

  fromBrukerZip: brukerConversion.brukerToNMRIUM
}
