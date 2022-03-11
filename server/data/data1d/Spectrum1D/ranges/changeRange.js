"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeRange = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
const updateRangesRelativeValues_1 = require("./updateRangesRelativeValues");
function changeRange(datum, range) {
    const { from, to } = range;
    const { x, re } = datum.data;
    const index = datum.ranges.values.findIndex((i) => i.id === range.id);
    const absolute = (0, ml_spectra_processing_1.xyIntegration)({ x, y: re }, { from, to, reverse: true });
    if (index !== -1) {
        datum.ranges.values[index] = {
            ...datum.ranges.values[index],
            originFrom: from,
            originTo: to,
            ...range,
            absolute,
        };
        (0, updateRangesRelativeValues_1.updateRangesRelativeValues)(datum);
    }
}
exports.changeRange = changeRange;
