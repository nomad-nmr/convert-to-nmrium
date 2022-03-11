"use strict";
/**
 *
 * @param {Object} datum1d
 * @param {number} [shiftValue=0]
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.name = exports.id = void 0;
exports.id = 'shiftX';
exports.name = 'Shift X';
function apply(datum1D, shiftValue = 0) {
    datum1D.data.x = datum1D.data.x.map((val) => val + shiftValue);
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
