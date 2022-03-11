"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlice = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
const Spectrum1D_1 = require("../../data1d/Spectrum1D");
function getSlice(spectrum, position) {
    const data = spectrum.data;
    const xStep = (data.maxX - data.minX) / (data.z[0].length - 1);
    const yStep = (data.maxY - data.minY) / (data.z.length - 1);
    const xIndex = Math.floor((position.x - data.minX) / xStep);
    const yIndex = Math.floor((position.y - data.minY) / yStep);
    if (xIndex < 0 || xIndex >= data.z[0].length)
        return;
    if (yIndex < 0 || yIndex >= data.z.length)
        return;
    let infoX = {
        nucleus: spectrum.info.nucleus[0],
        isFid: false,
        isComplex: false,
        dimension: 1,
    };
    let dataX = {
        x: (0, ml_spectra_processing_1.zoneToX)({ from: spectrum.data.minX, to: spectrum.data.maxX }, spectrum.data.z[0].length),
        re: new Float64Array(spectrum.data.z[0].length),
    };
    for (let i = 0; i < spectrum.data.z[0].length; i++) {
        dataX.re[i] += spectrum.data.z[yIndex][i];
    }
    let infoY = {
        nucleus: spectrum.info.nucleus[1],
        isFid: false,
        isComplex: false,
        dimension: 1,
    };
    let dataY = {
        x: (0, ml_spectra_processing_1.zoneToX)({ from: spectrum.data.minY, to: spectrum.data.maxY }, spectrum.data.z.length),
        re: new Float64Array(spectrum.data.z.length),
    };
    let index = spectrum.data.z.length - 1;
    for (let i = 0; i < spectrum.data.z.length; i++) {
        dataY.re[i] += spectrum.data.z[index--][xIndex];
    }
    const horizontal = (0, Spectrum1D_1.initiateDatum1D)({ info: infoX, data: dataX }, {});
    const vertical = (0, Spectrum1D_1.initiateDatum1D)({ info: infoY, data: dataY }, {});
    return { horizontal, vertical };
}
exports.getSlice = getSlice;
