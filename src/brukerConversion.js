'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.toNMRIUM = exports.brukerToNMRIUM = exports.toJSON1D = exports.toJSON2D = void 0
const fs = require('fs')
const SpectraManager = require('../src/SpectraManager.js')
const migrationManager = require('../src/migration/MigrationManager.js')
const { file } = require('jszip')

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
async function brukerToNMRIUM(zipFile, save = false, filepath = 'default.json') {
  try {
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
    let migratedSpec = migrationManager.migrate(spectra)
    if (save) {
      fs.writeFileSync(filepath, JSON.stringify(migratedSpec))
      console.log('JSON written to path:' + filepath)
    }

    return JSON.stringify(migratedSpec)
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