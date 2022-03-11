"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
const ml_array_xy_equally_spaced_1 = __importDefault(require("ml-array-xy-equally-spaced"));
exports.id = 'equallySpaced';
exports.name = 'Equally Spaced';
/**
 * Equally Spaced
 * **
 * Function that returns a Number array of equally spaced numberOfPoints
 * containing a representation of intensities of the spectra arguments x
 * and y.
 *
 * The options parameter contains an object in the following form:
 * from: starting point
 * to: last point
 * numberOfPoints: number of points between from and to
 * variant: "slot" or "smooth" - smooth is the default option
 *
 * The slot variant consist that each point in the new array is calculated
 * averaging the existing points between the slot that belongs to the current
 * value. The smooth variant is the same but takes the integral of the range
 * of the slot and divide by the step size between two points in the new array.
 *
 * @param {Datum1d} datum1d
 * @param {Object} options.from
 * @param {number} options.to
 * @param {number} options.numberOfPoints
 * @param {Array<{from:number;to:number}>} options.exclusions
 */
function apply(datum1D, options = {}) {
    if (!isApplicable(datum1D)) {
        throw new Error('Equally Spaced is not applicable on this data');
    }
    const { from, to, numberOfPoints, exclusions } = options;
    const { x, re, im } = datum1D.data;
    const XREdata = (0, ml_array_xy_equally_spaced_1.default)({ x, y: re }, { from, to, numberOfPoints, exclusions });
    datum1D.data.x = XREdata.x;
    datum1D.data.re = XREdata.y;
    if (im) {
        const XIMdata = (0, ml_array_xy_equally_spaced_1.default)({ x, y: re }, { from, to, numberOfPoints, exclusions });
        datum1D.data.im = XIMdata.y;
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
