"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get1DDataXY = void 0;
/**
 * @typedef {Object} datum
 * @property {number[]} x - The X points series
 * @property {number[]} y - The Y points series
 */
/**
 *
 * @param spectrum 1d spectrum
 * @returns {datum} datum object includes x and y series
 */
function get1DDataXY(spectrum) {
    const { display: { isRealSpectrumVisible }, data: { x, re, im }, } = spectrum;
    return { x, y: isRealSpectrumVisible ? re : im };
}
exports.get1DDataXY = get1DDataXY;
