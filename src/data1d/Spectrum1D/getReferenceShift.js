"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReferenceShift = void 0;
const ml_array_mean_1 = __importDefault(require("ml-array-mean"));
const ml_gsd_1 = require("ml-gsd");
const ml_spectra_processing_1 = require("ml-spectra-processing");
const References_1 = require("../../constants/References");
/**
 *
 * @param {*} datum1D
 * @param {object} [options={}]
 * @param {number} [options.from]
 * @param {number} [options.to] Define the from zone where the reference is expected to be found
 * @param {number} [options.from]
 * @param {number} [options.nbPeaks]
 * @param {number} [options.targetX]
 * @param {string} [options.reference]
 */
function getReferenceShift(datum1D, options) {
    let { from, to, nbPeaks, targetX, reference } = options;
    if (reference) {
        let data = (0, References_1.getRange)({ reference: reference, nucleus: datum1D.nucleus });
        from = data.from;
        to = data.to;
        nbPeaks = data.nbPeaks;
        targetX = data.delta;
    }
    const { re, x } = datum1D.data;
    return xyCalibrate({ x, y: re }, { from, to }, { nbPeaks, targetX });
}
exports.getReferenceShift = getReferenceShift;
// This is a copy of the function defined in https://github.com/cheminfo/spectra-processor/blob/b87f6f6c4d45a64dc16f3f9692d5f5dc7e398e5e/src/spectrum/xyCalibrate.js
function xyCalibrate(data, range = {}, options = {}) {
    const { targetX = 0, nbPeaks = 1, gsd: gsdOptions = {
        minMaxRatio: 0.1,
        realTopDetection: true,
        smoothY: true,
        sgOptions: {
            windowSize: 7,
            polynomial: 3,
        },
    }, } = options;
    let { from, to } = range;
    if (from === undefined || to === undefined)
        return 0;
    const fromIndex = (0, ml_spectra_processing_1.xFindClosestIndex)(data.x, from);
    const toIndex = (0, ml_spectra_processing_1.xFindClosestIndex)(data.x, to);
    const sliceddata = {
        x: data.x.slice(fromIndex, toIndex),
        y: data.y.slice(fromIndex, toIndex),
    };
    let peaks = (0, ml_gsd_1.gsd)(sliceddata, gsdOptions)
        .sort((a, b) => b.y - a.y)
        .slice(0, nbPeaks);
    if (peaks.length === 0)
        return 0;
    const middle = (0, ml_array_mean_1.default)(peaks.map((peak) => peak.x));
    return targetX - middle;
}
