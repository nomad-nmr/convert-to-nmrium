"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
exports.id = 'absolute';
exports.name = 'Absolute';
/**
 *
 * @param {Datum1d} datum1d
 */
function apply(datum1D) {
    if (!isApplicable(datum1D)) {
        throw new Error('absolute not applicable on this data');
    }
    datum1D.data.re = (0, ml_spectra_processing_1.reimAbsolute)(datum1D.data);
    datum1D.data.im = new Float64Array(0);
    datum1D.info = { ...datum1D.info, isComplex: false };
}
exports.apply = apply;
function isApplicable(datum1D) {
    if (datum1D.info.isComplex && !datum1D.info.isFid)
        return true;
    return false;
}
exports.isApplicable = isApplicable;
function reduce() {
    return {
        once: false,
        reduce: null,
    };
}
exports.reduce = reduce;
