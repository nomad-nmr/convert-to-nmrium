"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = exports.addJcamps = exports.addJDFs = exports.fromZip = exports.addBruker = exports.fromJSON = exports.addJDF = exports.addJcamp = exports.addJcampFromURL = exports.DataExportOptions = void 0;
const nmr_parser_1 = require("nmr-parser");
const Constants_1 = require("./Constants");
const Data1DManager = __importStar(require("./data1d/Data1DManager"));
const Datum1D = __importStar(require("./data1d/Spectrum1D"));
const Data2DManager = __importStar(require("./data2d/Data2DManager"));
const Datum2D = __importStar(require("./data2d/Spectrum2D"));
const MigrationManager_1 = require("./migration/MigrationManager");
const Molecule = __importStar(require("./molecules/Molecule"));
var DataExportOptions;
(function (DataExportOptions) {
    DataExportOptions["ROW_DATA"] = "ROW_DATA";
    DataExportOptions["DATA_SOURCE"] = "DATA_SOURCE";
})(DataExportOptions = exports.DataExportOptions || (exports.DataExportOptions = {}));
function addJcampFromURL(spectra, jcampURL, options, usedColors) {
    return fetch(jcampURL)
        .then((response) => response.arrayBuffer())
        .then((jcamp) => {
        addJcamp(spectra, jcamp, options, usedColors);
    });
}
exports.addJcampFromURL = addJcampFromURL;
function addJcamp(spectra, jcamp, options, usedColors) {
    options = options || {};
    const entries = (0, nmr_parser_1.fromJCAMP)(jcamp, {
        noContour: true,
        xy: true,
        keepRecordsRegExp: /.*/,
        profiling: true,
    });
    if (entries.length === 0)
        return;
    // Should be improved when we have a more complex case
    for (let entry of entries) {
        let { dependentVariables } = entry;
        if (dependentVariables[0].components &&
            (dependentVariables[0].components.length > 0 ||
                dependentVariables[0].components.z.length)) {
            addJcampSS(spectra, entry, options, usedColors);
        }
    }
}
exports.addJcamp = addJcamp;
function addJcampSS(spectra, entry, options, usedColors) {
    const dimension = entry.info.dimension;
    if (dimension === 1) {
        spectra.push(Data1DManager.fromParsedJcamp(entry, options, usedColors));
    }
    if (dimension === 2) {
        spectra.push(Data2DManager.fromParsedJcamp(entry, options, usedColors));
    }
}
function addData(spectra, datum, usedColors) {
    const dimension = datum.info.dimension;
    if (dimension === 1) {
        spectra.push(Datum1D.initiateDatum1D(datum, usedColors));
    }
    if (dimension === 2) {
        spectra.push(Datum2D.initiateDatum2D(datum, usedColors));
    }
}
function addJDF(spectra, jdf, options = {}, usedColors = {}) {
    // need to parse the jcamp
    let converted = (0, nmr_parser_1.fromJEOL)(jdf, {});
    converted = converted[0];
    let info = converted.description;
    let metadata = info.metadata;
    delete info.metadata;
    info.acquisitionMode = 0;
    info.experiment = info.dimension === 1 ? '1d' : '2d';
    info.type = 'NMR SPECTRUM';
    info.nucleus = info.nucleus[0];
    info.numberOfPoints = info.numberOfPoints[0];
    info.acquisitionTime = info.acquisitionTime[0];
    info.baseFrequency = info.baseFrequency[0];
    info.frequencyOffset = info.frequencyOffset[0];
    info.spectralWidthClipped = converted.application.spectralWidthClipped;
    if (info.dimension === 1) {
        if (converted.dependentVariables) {
            spectra.push(Data1DManager.fromCSD(converted, {
                ...options,
                display: { ...options.display },
                info: info,
                meta: metadata,
            }, usedColors));
        }
    }
    if (info.dimension === 2 && info.isFt) {
        spectra.push(Data2DManager.fromCSD(converted, {
            ...options,
            display: { ...options.display },
            info,
        }, usedColors));
    }
}
exports.addJDF = addJDF;
async function fromJSON(data = [], usedColors = {}) {
    const spectra = [];
    let promises = [];
    for (let datum of data) {
        if (datum?.source?.jcampURL != null) {
            promises.push(addJcampFromURL(spectra, datum.source.jcampURL, datum, usedColors));
        }
        else {
            addData(spectra, datum, usedColors);
        }
    }
    await Promise.all(promises);
    return spectra;
}
exports.fromJSON = fromJSON;
async function addBruker(options, data, usedColors) {
    const spectra = [];
    let result = await (0, nmr_parser_1.fromBruker)(data, {
        xy: true,
        noContours: true,
        keepOriginal: true,
    });
    let entries = result;
    for (let entry of entries) {
        let { info, dependentVariables } = entry;
        if (info.dimension === 1) {
            if (dependentVariables[0].components) {
                spectra.push(Data1DManager.fromBruker(entry, {
                    ...options,
                    display: { ...options.display },
                }, usedColors));
            }
        }
        else if (info.dimension === 2) {
            if (info.isFt) {
                spectra.push(Data2DManager.fromBruker(entry, {
                    ...options,
                    info,
                    display: { ...options.display },
                }, usedColors));
            }
            else {
                // in case of 2D FID spectrum
            }
        }
    }
    return spectra;
}
exports.addBruker = addBruker;
// handle zip files
async function fromZip(zipFiles) {
    const spectra = [];
    for (let zipFile of zipFiles) {
        await addBruker(spectra, { display: { name: zipFile.name } }, zipFile.binary);
    }
    return spectra;
}
exports.fromZip = fromZip;
function addJDFs(files, usedColors) {
    const spectra = [];
    for (const file of files) {
        addJDF(spectra, file.binary, {
            display: {
                name: file.name,
            },
            source: {
                jcampURL: file.jcampURL ? file.jcampURL : null,
                file,
            },
        }, usedColors);
    }
    console.log(spectra);
    return spectra;
}
exports.addJDFs = addJDFs;
function addJcamps(files, usedColors) {
    const spectra = [];
    for (const file of files) {
        addJcamp(spectra, file.binary, {
            display: {
                name: file.name,
            },
            source: {
                jcampURL: file.jcampURL ? file.jcampURL : null,
                file,
            },
        }, usedColors);
    }
    return spectra;
}
exports.addJcamps = addJcamps;
function getPreferences(state) {
    const { activeTab, verticalAlign: { align }, } = state;
    return {
        activeTab,
        ...(state.displayerMode === Constants_1.DISPLAYER_MODE.DM_1D
            ? { verticalAlign: align }
            : {}),
    };
}
/**
 *
 * @param {object} state
 */
function toJSON(state, dataExportOption = DataExportOptions.DATA_SOURCE) {
    const { data, molecules: mols, correlations, multipleAnalysis, toolOptions: { data: { exclusionZones }, }, } = state || {
        data: [],
        molecules: [],
        correlations: {},
        multipleAnalysis: {},
        exclusionZones: {},
    };
    const spectra = data.map((ob) => {
        return ob.info.dimension === 1
            ? Datum1D.toJSON(ob, dataExportOption)
            : Datum2D.toJSON(ob, dataExportOption);
    });
    const preferences = getPreferences(state);
    const molecules = mols.map((mol) => Molecule.toJSON(mol));
    return {
        spectra,
        molecules,
        correlations,
        multipleAnalysis,
        exclusionZones,
        version: MigrationManager_1.CURRENT_EXPORT_VERSION,
        preferences,
    };
}
exports.toJSON = toJSON;
