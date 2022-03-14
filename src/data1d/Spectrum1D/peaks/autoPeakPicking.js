"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoPeakPicking = void 0;
const ml_array_median_1 = __importDefault(require("ml-array-median"));
const nmr_processing_1 = require("nmr-processing");
const generateID_1 = __importDefault(require("../../../utilities/generateID"));
const getShiftX_1 = require("../shift/getShiftX");
function autoPeakPicking(datum1D, options) {
    const { minMaxRatio, maxNumberOfPeaks, noiseFactor, lookNegative, windowFromIndex, windowToIndex, } = options;
    // we calculate the noise but this could be improved
    const noise = (0, ml_array_median_1.default)(datum1D.data.re.map((y) => Math.abs(y)));
    let { re, x } = datum1D.data;
    let { values: currentPeaks = [] } = datum1D.peaks || {};
    if (windowFromIndex !== undefined && windowToIndex !== undefined) {
        x = x.slice(windowFromIndex, windowToIndex);
        re = re.slice(windowFromIndex, windowToIndex);
    }
    let peaks = (0, nmr_processing_1.xyAutoPeaksPicking)({ x, y: re }, {
        lookNegative,
        noiseLevel: noise * noiseFactor,
        minMaxRatio: minMaxRatio,
        realTopDetection: true,
        smoothY: false,
        sgOptions: { windowSize: 15, polynomial: 3 },
    });
    peaks.sort((a, b) => b.y - a.y);
    if (maxNumberOfPeaks < peaks.length)
        peaks = peaks.slice(0, maxNumberOfPeaks);
    const shiftX = (0, getShiftX_1.getShiftX)(datum1D);
    const error = (x[x.length - 1] - x[0]) / 10000;
    return peaks.reduce((acc, newPeak) => {
        // check if the peak is already exists
        for (const { x } of currentPeaks) {
            if (Math.abs(newPeak.x - x) < error) {
                return acc;
            }
        }
        acc.push({
            id: (0, generateID_1.default)(),
            originalX: newPeak.x - shiftX,
            x: newPeak.x,
            y: newPeak.y,
            width: newPeak.width,
        });
        return acc;
    }, []);
}
exports.autoPeakPicking = autoPeakPicking;
