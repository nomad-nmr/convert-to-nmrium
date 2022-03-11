"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
exports.id = 'fromTo';
exports.name = 'From/To';
/**
 *
 * @param {Datum1d} datum1d
 */
function apply(datum1D, options = {}) {
    if (!isApplicable(datum1D)) {
        throw new Error('From/To filter not applicable on this data');
    }
    const { x, re, im } = datum1D.data;
    const { from, to } = options;
    const { fromIndex, toIndex } = (0, ml_spectra_processing_1.xGetFromToIndex)(x, { from, to });
    datum1D.data.x = x.slice(fromIndex, toIndex);
    datum1D.data.re = re.slice(fromIndex, toIndex);
    if (im) {
        datum1D.data.im = im.slice(fromIndex, toIndex);
    }
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
