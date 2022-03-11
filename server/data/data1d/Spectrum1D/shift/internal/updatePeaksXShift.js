"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePeaksXShift = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
function updatePeaksXShift(datum, shiftValue) {
    datum.peaks.values = datum.peaks.values.map((peak) => {
        const delta = peak.originalX + shiftValue;
        const xIndex = (0, ml_spectra_processing_1.xFindClosestIndex)(datum.data.x, delta);
        return {
            ...peak,
            y: datum.data.re[xIndex],
            x: peak.originalX + shiftValue,
        };
    });
}
exports.updatePeaksXShift = updatePeaksXShift;
