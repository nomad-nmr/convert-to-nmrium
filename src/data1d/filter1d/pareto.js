"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
exports.id = 'pareto';
exports.name = 'Pareto';
/**
 * Computes the arithmetic mean of the given values
 * @param {Datum1d} datum1d
 */
function apply(datum1D) {
    if (!isApplicable(datum1D)) {
        throw new Error('Pareto is not applicable on this data');
    }
    const re = datum1D.data.re.slice(0);
    const im = datum1D.data.im?.slice(0);
    datum1D.data.re = (0, ml_spectra_processing_1.xParetoNormalization)(re);
    if (im) {
        datum1D.data.im = (0, ml_spectra_processing_1.xParetoNormalization)(im);
    }
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
