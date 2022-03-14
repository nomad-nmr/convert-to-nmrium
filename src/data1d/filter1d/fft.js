"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
exports.id = 'fft';
exports.name = 'FFT';
/**
 *
 * @param {Datum1d} datum1d
 */
function apply(datum1D) {
    if (!isApplicable(datum1D)) {
        throw new Error('fft not applicable on this data');
    }
    let digitalFilterApplied = datum1D.filters.some((e) => e.name === 'digitalFilter' && e.flag);
    Object.assign(datum1D.data, (0, ml_spectra_processing_1.reimFFT)(datum1D.data, { applyZeroShift: true }));
    if (digitalFilterApplied) {
        let { digitalFilter } = datum1D.info;
        let ph1 = (digitalFilter - Math.floor(digitalFilter)) * Math.PI * 2;
        Object.assign(datum1D.data, (0, ml_spectra_processing_1.reimPhaseCorrection)(datum1D.data, 0, ph1));
    }
    datum1D.data.x = generateXAxis(datum1D);
    datum1D.info = { ...datum1D.info, isFid: false, isFt: true };
}
exports.apply = apply;
function isApplicable(datum1D) {
    if (datum1D.info.isComplex && datum1D.info.isFid)
        return true;
    return false;
}
exports.isApplicable = isApplicable;
function reduce() {
    return {
        once: true,
        reduce: undefined,
    };
}
exports.reduce = reduce;
function generateXAxis(datum1D) {
    const info = datum1D.info;
    const baseFrequency = parseFloat(info.baseFrequency);
    const frequencyOffset = parseFloat(info.frequencyOffset);
    const spectralWidth = parseFloat(info.spectralWidth);
    const offset = frequencyOffset / baseFrequency;
    let spectralHalfWidth = 0.5 * spectralWidth;
    let nbPoints = datum1D.data.x.length;
    let firstPoint = offset - spectralHalfWidth;
    let dx = spectralWidth / (nbPoints - 1);
    const xAxis = new Array(nbPoints);
    for (let i = 0; i < nbPoints; i++) {
        xAxis[i] = firstPoint;
        firstPoint += dx;
    }
    return xAxis;
}
