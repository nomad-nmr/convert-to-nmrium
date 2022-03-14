"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectRange = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
const generateID_1 = __importDefault(require("../../../utilities/generateID"));
const getShiftX_1 = require("../shift/getShiftX");
function detectRange(datum, options) {
    const { from, to } = options;
    const { x, re: y } = datum.data;
    const absolute = (0, ml_spectra_processing_1.xyIntegration)({ x, y }, { from, to, reverse: true });
    // @ts-expect-error Types will be fixed in ml-spectra-processing.
    const min = (0, ml_spectra_processing_1.xyMinYPoint)({ x, y }, { from, to }).y;
    const max = (0, ml_spectra_processing_1.xyMaxYPoint)({ x, y }, { from, to }).y;
    const shiftX = (0, getShiftX_1.getShiftX)(datum);
    return {
        id: (0, generateID_1.default)(),
        originFrom: from - shiftX,
        originTo: to - shiftX,
        from,
        to,
        absolute,
        min,
        max,
    };
}
exports.detectRange = detectRange;
