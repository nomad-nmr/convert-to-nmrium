const getNMRium = require('convert-to-nmrium')

getNMRium
  .fromBrukerZip('./test/data/NOMAD_download-HSQC.zip', {
    save: true,
    outputPath: './test/data/testFromBruker.nmrium',
    spectrumOnly: true,
    removeMeta: false,
    removeProjections: false,
    title: 'Test'
  })
  .then(nmriumObj => nmriumObj.spectra.forEach(i => console.log(i.info)))
  .catch(error => console.log(error))
