"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nmr_processing_1 = require("nmr-processing");
const defaultPeakPickingOptions = {
    minMaxRatio: 1,
    realTopDetection: true,
    maxCriteria: true,
    smoothY: false,
    integrationSum: 100,
    factorStd: 5,
    clean: true,
    sgOptions: { windowSize: 7, polynomial: 3 },
};
function autoRangesDetection(datum1D, options = {}) {
    // we calculate the noise but this could be improved
    let { re, x } = datum1D.data;
    const { originFrequency, nucleus } = datum1D.info;
    const { windowFromIndex, windowToIndex, peakPicking } = options;
    const peakPickingOptions = {
        ...defaultPeakPickingOptions,
        ...peakPicking,
    };
    const rangesOptions = {
        frequency: originFrequency,
        nucleus,
        compile: true,
        frequencyCluster: 13,
        keepPeaks: true,
    };
    if (windowFromIndex !== undefined && windowToIndex !== undefined) {
        x = x.slice(windowFromIndex, windowToIndex);
        re = re.slice(windowFromIndex, windowToIndex);
    }
    if (originFrequency) {
        let ws = Math.max(Math.round(1 / originFrequency / (x[1] - x[0])), 5);
        peakPickingOptions.sgOptions = {
            windowSize: ws - (ws % 2) + 1,
            polynomial: 3,
        };
    }
    const ranges = (0, nmr_processing_1.xyAutoRangesPicking)({ x, y: re }, {
        peakPicking: peakPickingOptions,
        ranges: rangesOptions,
    });
    return ranges;
}
exports.default = autoRangesDetection;
