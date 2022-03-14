"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
exports.id = 'autoPhaseCorrection';
exports.name = 'Automatic phase correction';
/**
 *
 * @param {Datum1d} datum1d
 * @param {Object} [options={}]
 * @param {number} [options.ph0=0]
 * @param {number} [options.ph1=0]
 */
const defaultOptions = {
    minRegSize: 5,
    maxDistanceToJoin: 128,
    magnitudeMode: true,
    factorNoise: 5,
};
function apply(datum1D, options = {}) {
    if (!isApplicable(datum1D)) {
        throw new Error('phaseCorrection not applicable on this data');
    }
    return (0, ml_spectra_processing_1.reimAutoPhaseCorrection)(datum1D.data, {
        ...defaultOptions,
        ...options,
    });
}
exports.apply = apply;
function isApplicable(datum1D) {
    if (datum1D.info.isComplex && !datum1D.info.isFid)
        return true;
    return false;
}
exports.isApplicable = isApplicable;
function reduce(previousValue, newValue) {
    let reduced = Object.assign({}, previousValue);
    for (const k in reduced) {
        reduced[k] += newValue[k];
    }
    return {
        once: true,
        reduce: reduced,
    };
}
exports.reduce = reduce;
