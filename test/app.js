const fs = require('fs')
const getNMRium = require('convert-to-nmrium')

const zipFile = fs.readFileSync('./data/test-Bruker.zip')

getNMRium
  .fromBrukerZip(zipFile, true, './data/testFromBruker.nmrium')
  .then(resp => console.log(resp))
  .catch(error => console.log(error))
