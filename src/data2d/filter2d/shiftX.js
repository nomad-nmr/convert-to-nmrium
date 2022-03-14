"use strict";
/**
 *
 * @param {Object} datum2d
 * @param {number} [shiftValue=0]
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
exports.id = 'shift2DX';
exports.name = 'Shift 2D X';
function apply(datum2D, shiftValue = 0) {
    datum2D.data.minX += shiftValue;
    datum2D.data.maxX += shiftValue;
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
