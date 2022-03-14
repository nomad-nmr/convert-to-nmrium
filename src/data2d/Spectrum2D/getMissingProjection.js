"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMissingProjection = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
const Spectrum1D_1 = require("../../data1d/Spectrum1D");
/**
 * calculate the missing projection
 */
function getMissingProjection(datum, nucleus, usedColors) {
    let index = datum.info.nucleus.indexOf(nucleus);
    // temporary because nucleus was undefined;
    if (index === -1)
        index = 0;
    let info = {
        nucleus: datum.info.nucleus[index],
        isFid: false,
        isComplex: false,
        dimension: 1,
    };
    let from = index === 0 ? datum.data.minX : datum.data.minY;
    let to = index === 0 ? datum.data.maxX : datum.data.maxY;
    let nbPoints = index === 0 ? datum.data.z[0].length : datum.data.z.length;
    let projection = new Float64Array(nbPoints);
    if (index === 1) {
        for (let i = 0; i < datum.data.z.length; i++) {
            for (let j = 0; j < datum.data.z[0].length; j++) {
                projection[i] += datum.data.z[i][j];
            }
        }
    }
    else {
        for (let i = 0; i < datum.data.z[0].length; i++) {
            for (const z of datum.data.z) {
                projection[i] += z[i];
            }
        }
    }
    let data = {
        x: (0, ml_spectra_processing_1.zoneToX)({ from, to }, nbPoints),
        re: projection,
    };
    return (0, Spectrum1D_1.initiateDatum1D)({ info, data }, usedColors);
}
exports.getMissingProjection = getMissingProjection;
