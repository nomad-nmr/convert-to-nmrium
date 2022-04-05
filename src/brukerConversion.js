'use strict'
const fs = require('fs')
const SpectraManager = require('../src/SpectraManager.js')
const migrationManager = require('../src/migration/MigrationManager.js')

//for each spectra, convert into required format for each type (1D / 2D)
//returns spectra data and default presets.
function toNMRIUM(data, dataExportOption) {
  const spectra = data.map(ob => {
    //CHANGE ob.display.name to custom experiment name
    return ob.info.dimension === 1 ? toJSON1D(ob, dataExportOption) : toJSON2D(ob, dataExportOption)
  })
  return {
    spectra,
    molecules: [],
    correlations: {},
    multipleAnalysis: {},
    exclusionZones: {},
    version: 0,
    peferances: {}
  }
}
exports.toNMRIUM = toNMRIUM

//Takes as parameters the zipFile, a flag whether to save to FS and the filepath
//returns a JSON string in the nmrium format
async function brukerToNMRIUM(inputPath, options) {
  try {
    const zipFile = fs.readFileSync(inputPath)

    let specData = await SpectraManager.addBruker(
      {
        xy: true,
        noContours: true,
        keepOriginal: true
      },
      zipFile,
      {}
    )

    //builds nmrium JSON object
    let spectra = toNMRIUM(specData, 'DATA_SOURCE')
    //updates format to v2
    const migratedSpec = migrationManager.migrate(spectra)

    let output = { ...migratedSpec }

    if (options.spectrumOnly) {
      output = { spectra: migratedSpec.spectra.filter(spec => !spec.info.isFid) }
    }

    if (options.removeProjections && output.spectra.length > 1) {
      output.spectra = output.spectra.filter(spec => spec.info.isFid || spec.info.dimension === 2)
    }

    if (options.removeMeta) {
      output.spectra = output.spectra.map(spec => {
        spec.meta = {}
        return spec
      })
    }

    if (options.title) {
      output.spectra = output.spectra.map(spec => {
        spec.display.name = options.title
        return spec
      })
    }

    if (options.save) {
      fs.writeFileSync(options.outputPath, JSON.stringify(output))
      if (process.env.NODE_ENV !== 'production') {
        console.log('JSON written to path:' + options.outputPath)
      }
    }

    return output
  } catch (error) {
    console.error(error)
  }
}

exports.brukerToNMRIUM = brukerToNMRIUM

//Formatting for 1D spectra
function toJSON1D(datum1D, dataExportOption) {
  //Takes values from key-value pairs and create an array of value datapoints
  var x = []
  var re = []
  var im = []
  for (var k in datum1D.originalData.x) {
    x.push(datum1D.originalData.x[k])
  }
  for (var k in datum1D.originalData.re) {
    re.push(datum1D.originalData.re[k])
  }
  for (var k in datum1D.originalData.im) {
    im.push(datum1D.originalData.im[k])
  }
  return {
    //id set to spectra file path
    id: datum1D.source.file.name,
    display: datum1D.display,
    ...(dataExportOption === SpectraManager.DataExportOptions.ROW_DATA ||
    (dataExportOption === SpectraManager.DataExportOptions.DATA_SOURCE && !datum1D.source.jcampURL)
      ? {
          data: {
            x,
            re,
            im
          },
          info: datum1D.originalInfo,
          meta: datum1D.meta,
          source: {
            jcampURL: null
          }
        }
      : {
          source: {
            jcampURL: datum1D.source.jcampURL
          }
        }),
    peaks: datum1D.peaks,
    integrals: datum1D.integrals,
    ranges: datum1D.ranges,
    filters: datum1D.filters
  }
}
exports.toJSON1D = toJSON1D

//Formatting for 2D spectra
function toJSON2D(datum, dataExportOption) {
  //Mapping key-value pairs of z data to an array of arrays containing just value data
  var z = []
  for (var k in datum.originalData.z) {
    var zSub = []
    for (var j in datum.originalData.z[k]) {
      zSub.push(datum.originalData.z[k][j])
    }
    z.push(zSub)
  }
  return {
    id: datum.source.file.name,
    ...(dataExportOption === SpectraManager.DataExportOptions.ROW_DATA ||
    (dataExportOption === SpectraManager.DataExportOptions.DATA_SOURCE && !datum.source.jcampURL)
      ? {
          data: {
            z,
            minX: datum.originalData.minX,
            minY: datum.originalData.minY,
            maxX: datum.originalData.maxX,
            maxY: datum.originalData.maxY,
            minZ: datum.originalData.minZ,
            maxZ: datum.originalData.maxZ,
            noise: datum.originalData.noise
          },
          info: datum.originalInfo,
          meta: datum.meta,
          source: {
            jcampURL: null
          }
        }
      : {
          source: {
            jcampURL: datum.source.jcampURL
          }
        }),
    zones: datum.zones,
    filters: datum.filters,
    display: datum.display
  }
}
exports.toJSON2D = toJSON2D
