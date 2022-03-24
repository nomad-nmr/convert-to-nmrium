const getNMRium = require('convert-to-nmrium')

getNMRium
  .fromBrukerZip('./test/data/test-Bruker.zip', {
    save: true,
    outputPath: './test/data/testFromBruker.nmrium',
    spectrumOnly: true,
    removeMeta: false,
    title: 'Test'
  })
  .then(nmriumObj => nmriumObj.spectra.forEach(i => console.log(i.id)))
  .catch(error => console.log(error))
