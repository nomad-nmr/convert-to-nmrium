"use strict";
/**
 *
 * @param {Object} datum2d
 * @param {number} [shiftValue=0]
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
exports.id = 'shift2DY';
exports.name = 'Shift 2D Y';
function apply(datum2D, shiftValue = 0) {
    datum2D.data.minY += shiftValue;
    datum2D.data.maxY += shiftValue;
}
exports.apply = apply;
function isApplicable() {
    return true;
}
exports.isApplicable = isApplicable;
function reduce(previousValue, newValue) {
    return {
        once: true,
        reduce: previousValue + newValue,
    };
}
exports.reduce = reduce;
