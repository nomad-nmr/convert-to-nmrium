// const express = require('express')
const fs = require('fs')
const brukerConversion = require('./brukerConversion.js')

// const PORT = process.env.PORT || 3002
// const app = express()

try {
  const zipFile = fs.readFileSync('./zip_data/test-2.zip')
  const convertedJSON = brukerConversion.brukerToNMRIUM(
    zipFile,
    true,
    './nmrium_data/test-2.nmrium'
  )
} catch (err) {
  console.error(err)
}

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`)
// })
