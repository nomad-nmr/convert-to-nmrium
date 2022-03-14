"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupPeak = void 0;
const ml_array_max_1 = __importDefault(require("ml-array-max"));
function lookupPeak(data, options) {
    const { from, to } = options;
    let minIndex = data.x.findIndex((number) => number >= from);
    let maxIndex = data.x.findIndex((number) => number >= to) - 1;
    if (minIndex > maxIndex) {
        minIndex = maxIndex;
        maxIndex = minIndex;
    }
    const dataRange = data.re.slice(minIndex, maxIndex);
    if (dataRange && dataRange.length > 0) {
        const yValue = (0, ml_array_max_1.default)(dataRange);
        const xIndex = dataRange.findIndex((value) => value === yValue);
        const xValue = data.x[minIndex + xIndex];
        return { x: xValue, y: yValue, xIndex: minIndex + xIndex };
    }
    return null;
}
exports.lookupPeak = lookupPeak;
