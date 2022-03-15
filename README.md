## convert-to-nmrium

Library extracted from **[NMRium project](https://www.nmrium.org/)** to enable coversion to NMRium format on a application server in node.js environment.

### fromBrukerZip(inputhPath, options)

options: object

- save : boolean
- outputPath : string

**Usage example:**

```js
const getNMRium = require('convert-to-nmrium')

getNMRium
  .fromBrukerZip('./test/data/test-Bruker.zip', {
    save: true,
    outputPath: './test/data/testFromBruker.nmrium'
  })
  .then(nmriumObj => console.log(nmriumObj.spectra))
  .catch(error => console.log(error))
```

**Test:**

```bash
npm run test
```
