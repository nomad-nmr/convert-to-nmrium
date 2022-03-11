"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSpectra = exports.predictSpectra = void 0;
const nmr_processing_1 = require("nmr-processing");
const full_1 = __importDefault(require("openchemlib/full"));
const SignalsKinds_1 = require("./constants/SignalsKinds");
const Spectrum1D_1 = require("./data1d/Spectrum1D");
const Spectrum2D_1 = require("./data2d/Spectrum2D");
const generateID_1 = __importDefault(require("./utilities/generateID"));
const baseURL = 'https://nmr-prediction.service.zakodium.com';
async function predictSpectra(molfile) {
    const molecule = full_1.default.Molecule.fromMolfile(molfile);
    return (0, nmr_processing_1.predictAll)(molecule, {
        predictOptions: {
            C: {
                webserviceURL: `${baseURL}/v1/predict/carbon`,
            },
        },
    });
}
exports.predictSpectra = predictSpectra;
function generateSpectra(data, inputOptions, usedColors) {
    const spectra = [];
    for (const experiment in data) {
        if (inputOptions.spectra[experiment]) {
            const spectrum = data[experiment];
            switch (experiment) {
                case 'proton':
                case 'carbon': {
                    const datum = generated1DSpectrum({
                        spectrum,
                        inputOptions,
                        experiment,
                        usedColors,
                    });
                    spectra.push(datum);
                    break;
                }
                case 'cosy':
                case 'hsqc':
                case 'hmbc': {
                    const datum = generated2DSpectrum({
                        spectrum,
                        inputOptions,
                        experiment,
                        usedColors,
                    });
                    spectra.push(datum);
                    break;
                }
                default:
                    break;
            }
        }
    }
    return spectra;
}
exports.generateSpectra = generateSpectra;
function generated1DSpectrum(params) {
    const { spectrum, inputOptions, experiment, usedColors } = params;
    const { signals, ranges, nucleus } = spectrum;
    const { '1d': { nbPoints }, frequency: freq, } = inputOptions;
    const frequency = getFrequency(nucleus, freq);
    const { x, y } = (0, nmr_processing_1.signalsToXY)(signals, {
        ...inputOptions['1d'][nucleus],
        frequency,
        nbPoints,
    });
    const datum = (0, Spectrum1D_1.initiateDatum1D)({
        data: { x, im: null, re: y },
        info: {
            nucleus,
            originFrequency: frequency,
            baseFrequency: frequency,
            pulseSequence: 'prediction',
            solvent: '',
            experiment,
            isFt: true,
        },
    }, usedColors);
    datum.ranges.values = (0, Spectrum1D_1.mapRanges)(ranges, datum);
    (0, Spectrum1D_1.updateIntegralsRelativeValues)(datum);
    return datum;
}
function mapZones(zones) {
    return zones.reduce((zonesAcc, zone) => {
        const { signals, ...resZone } = zone;
        const newSignals = signals.reduce((signalsAcc, signal) => {
            const { x, y, id, ...resSignal } = signal;
            signalsAcc.push({
                id: id || (0, generateID_1.default)(),
                kind: 'signal',
                x: { ...x, originDelta: x.delta || 0 },
                y: { ...y, originDelta: y.delta || 0 },
                ...resSignal,
            });
            return signalsAcc;
        }, []);
        zonesAcc.push({
            id: (0, generateID_1.default)(),
            ...resZone,
            signals: newSignals,
            kind: SignalsKinds_1.DatumKind.signal,
        });
        return zonesAcc;
    }, []);
}
function generated2DSpectrum(params) {
    const { spectrum, inputOptions, experiment, usedColors } = params;
    const { signals, zones, nuclei } = spectrum;
    const xOption = inputOptions['1d'][nuclei[0]];
    const yOption = inputOptions['1d'][nuclei[1]];
    const width = get2DWidth(nuclei);
    const frequency = getFrequency(nuclei, inputOptions.frequency);
    const spectrumData = (0, nmr_processing_1.signals2DToZ)(signals, {
        from: { x: xOption.from, y: yOption.from },
        to: { x: xOption.to, y: yOption.to },
        nbPoints: {
            x: inputOptions['2d'].nbPoints.x,
            y: inputOptions['2d'].nbPoints.y,
        },
        width,
    });
    const datum = (0, Spectrum2D_1.initiateDatum2D)({
        data: { ...spectrumData, noise: 0.01 },
        info: {
            nucleus: nuclei,
            originFrequency: frequency,
            baseFrequency: frequency,
            pulseSequence: experiment,
            experiment: '2d',
        },
    }, usedColors);
    datum.zones.values = mapZones(zones);
    return datum;
}
function get2DWidth(nucleus) {
    return nucleus[0] === nucleus[1] ? 0.03 : { x: 0.03, y: 0.32 };
}
function getFrequency(nucleus, inputFrequency) {
    const ration13C = 0.25;
    if (typeof nucleus === 'string') {
        return nucleus === '13C' ? inputFrequency * ration13C : inputFrequency;
    }
    else {
        if (nucleus[0] === nucleus[1]) {
            return `${inputFrequency},${inputFrequency}`;
        }
        else {
            return `${inputFrequency},${inputFrequency * ration13C}`;
        }
    }
}
