"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
const array_1 = require("ml-stat/array");
exports.id = 'standardDeviation';
exports.name = 'Standard Deviation';
/**
 * Computes the standard deviation of the given values
 * @param {Datum1d} datum1d
 */
function apply(datum1D) {
    if (!isApplicable(datum1D)) {
        throw new Error('Standard Deviation is not applicable on this data');
    }
    const re = datum1D.data.re.slice(0);
    const im = datum1D.data.im?.slice(0);
    const reStd = (0, array_1.standardDeviation)(re);
    const imStd = (0, array_1.standardDeviation)(im || []);
    for (let i = 0; i < re.length; i++) {
        re[i] /= reStd;
        if (im) {
            im[i] /= imStd;
        }
    }
    datum1D.data.re = re;
    if (im) {
        datum1D.data.im = im;
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
