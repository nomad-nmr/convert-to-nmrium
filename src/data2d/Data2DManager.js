"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromCSD = exports.fromBruker = exports.fromParsedJcamp = void 0;
const Spectrum2D_1 = require("./Spectrum2D");
function fromParsedJcamp(parsedJcamp, options, usedColors) {
    const { dependentVariables, info, meta } = parsedJcamp;
    let data = dependentVariables[0].components;
    const ob = (0, Spectrum2D_1.initiateDatum2D)({
        ...options,
        info,
        meta,
        data,
    }, usedColors);
    return ob;
}
exports.fromParsedJcamp = fromParsedJcamp;
function fromBruker(result, options = {}, usedColors = {}) {
    const { dependentVariables, meta, source } = result;
    let data = dependentVariables[0].components;
    const datum2D = (0, Spectrum2D_1.initiateDatum2D)({
        ...options,
        source,
        meta,
        data,
    }, usedColors);
    return datum2D;
}
exports.fromBruker = fromBruker;
// TODO: implement this.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fromCSD(result, options = {}, usedColors = {}) {
    const datum2D = (0, Spectrum2D_1.initiateDatum2D)({}, usedColors);
    return datum2D;
}
exports.fromCSD = fromCSD;
