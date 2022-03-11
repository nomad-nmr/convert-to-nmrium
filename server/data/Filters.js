"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shift2DY = exports.shift2DX = exports.pareto = exports.centerMean = exports.standardDeviation = exports.equallySpaced = exports.fromTo = exports.digitalFilter = exports.zeroFilling = exports.shiftX = exports.autoPhaseCorrection = exports.phaseCorrection = exports.fft = exports.lineBroadening = exports.baselineCorrection = exports.absolute = void 0;
const absolute = __importStar(require("./data1d/filter1d/absolute"));
exports.absolute = absolute;
const autoPhaseCorrection = __importStar(require("./data1d/filter1d/autoPhaseCorrection"));
exports.autoPhaseCorrection = autoPhaseCorrection;
const baselineCorrection = __importStar(require("./data1d/filter1d/baselineCorrection"));
exports.baselineCorrection = baselineCorrection;
const centerMean = __importStar(require("./data1d/filter1d/centerMean"));
exports.centerMean = centerMean;
const digitalFilter = __importStar(require("./data1d/filter1d/digitalFilter"));
exports.digitalFilter = digitalFilter;
const equallySpaced = __importStar(require("./data1d/filter1d/equallySpaced"));
exports.equallySpaced = equallySpaced;
const fft = __importStar(require("./data1d/filter1d/fft"));
exports.fft = fft;
const fromTo = __importStar(require("./data1d/filter1d/fromTo"));
exports.fromTo = fromTo;
const lineBroadening = __importStar(require("./data1d/filter1d/lineBroadening"));
exports.lineBroadening = lineBroadening;
const pareto = __importStar(require("./data1d/filter1d/pareto"));
exports.pareto = pareto;
const phaseCorrection = __importStar(require("./data1d/filter1d/phaseCorrection"));
exports.phaseCorrection = phaseCorrection;
const shiftX = __importStar(require("./data1d/filter1d/shiftX"));
exports.shiftX = shiftX;
const standardDeviation = __importStar(require("./data1d/filter1d/standardDeviation"));
exports.standardDeviation = standardDeviation;
const zeroFilling = __importStar(require("./data1d/filter1d/zeroFilling"));
exports.zeroFilling = zeroFilling;
const shift2DX = __importStar(require("./data2d/filter2d/shiftX"));
exports.shift2DX = shift2DX;
const shift2DY = __importStar(require("./data2d/filter2d/shiftY"));
exports.shift2DY = shift2DY;
