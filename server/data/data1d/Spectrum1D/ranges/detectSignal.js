"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ml_spectra_processing_1 = require("ml-spectra-processing");
const multiplet_analysis_1 = require("multiplet-analysis");
function detectSignal(x, re, from, to, frequency) {
    const { fromIndex, toIndex } = (0, ml_spectra_processing_1.xGetFromToIndex)(x, {
        from: from,
        to: to,
    });
    const data = {
        x: x.slice(fromIndex, toIndex),
        y: re.slice(fromIndex, toIndex),
    };
    const result = (0, multiplet_analysis_1.analyseMultiplet)(data, {
        frequency: frequency,
        takeBestPartMultiplet: true,
        symmetrizeEachStep: true,
    });
    return {
        multiplicity: result.js.map((j) => j.multiplicity).join(''),
        kind: 'signal',
        delta: result.chemShift,
        js: result.js,
    };
}
exports.default = detectSignal;
