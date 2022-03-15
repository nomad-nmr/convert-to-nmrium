const getNMRium = require('convert-to-nmrium')

getNMRium
  .fromBrukerZip('./test/data/test-Bruker.zip', {
    save: true,
    outputPath: './test/data/testFromBruker.nmrium'
  })
  .then(nmriumObj => nmriumObj.spectra.forEach(i => console.log(i.display)))
  .catch(error => console.log(error))
