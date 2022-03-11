"use strict";
/**
 * Sum values for specific key in the object
 * @param values array of object
 * @param key key
 * @param check custom check function to to indicate if certain object included or not in the summation
 * @returns number
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSum = void 0;
function getSum(values, key, check = null) {
    return values.reduce((sum, current) => {
        return check && check(current) === true
            ? (sum += Math.abs(current[key]))
            : sum;
    }, 0);
}
exports.getSum = getSum;
