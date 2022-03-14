"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
exports.id = 'phaseCorrection';
exports.name = 'Phase correction';
/**
 *
 * @param {Datum1d} datum1d
 * @param {Object} [options={}]
 * @param {number} [options.ph0=0]
 * @param {number} [options.ph1=0]
 */
function apply(datum1D, options = {}) {
    if (!isApplicable(datum1D)) {
        throw new Error('phaseCorrection not applicable on this data');
    }
    let { ph0, ph1 } = options;
    ph0 *= Math.PI / 180.0;
    ph1 *= Math.PI / 180.0;
    Object.assign(datum1D.data, (0, ml_spectra_processing_1.reimPhaseCorrection)(datum1D.data, ph0, ph1));
}
exports.apply = apply;
function isApplicable(datum1D) {
    if (datum1D.info.isComplex && !datum1D.info.isFid)
        return true;
    return false;
}
exports.isApplicable = isApplicable;
function reduce(previousValue, newValue) {
    return {
        once: true,
        reduce: newValue,
    };
}
exports.reduce = reduce;
