"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSpectrumFromRanges = void 0;
const nmr_processing_1 = require("nmr-processing");
const initiateDatum1D_1 = require("../initiateDatum1D");
const mapRanges_1 = require("./mapRanges");
function generateSpectrumFromRanges(ranges, info, usedColors) {
    const { nucleus, solvent, name = null, frequency = 400 } = info;
    const { x, y } = (0, nmr_processing_1.rangesToXY)(ranges, {
        frequency,
        nbPoints: 524288,
    });
    const datum = (0, initiateDatum1D_1.initiateDatum1D)({
        data: { x, im: null, re: y },
        display: { name },
        info: {
            nucleus,
            originFrequency: frequency,
            baseFrequency: frequency,
            pulseSequence: '',
            solvent,
            isFt: true,
        },
    }, usedColors);
    datum.ranges.values = (0, mapRanges_1.mapRanges)(ranges, datum);
    return datum;
}
exports.generateSpectrumFromRanges = generateSpectrumFromRanges;
