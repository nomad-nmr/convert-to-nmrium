"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRanges = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
const SignalsKinds_1 = require("../../../constants/SignalsKinds");
const generateID_1 = __importDefault(require("../../../utilities/generateID"));
const getShiftX_1 = require("../shift/getShiftX");
function mapRanges(ranges, datum) {
    const { x, re } = datum.data;
    const shiftX = (0, getShiftX_1.getShiftX)(datum);
    const error = (x[x.length - 1] - x[0]) / 10000;
    return ranges.reduce((acc, newRange) => {
        // check if the range is already exists
        for (const { from, to } of datum.ranges.values) {
            if (Math.abs(newRange.from - from) < error &&
                Math.abs(newRange.to - to) < error) {
                return acc;
            }
        }
        const absolute = (0, ml_spectra_processing_1.xyIntegration)({ x, y: re }, { from: newRange.from, to: newRange.to, reverse: true });
        const signals = newRange.signals.map((signal) => {
            const { kind = null, id, ...resSignal } = signal;
            return {
                kind: kind || 'signal',
                id: id || (0, generateID_1.default)(),
                originDelta: signal.delta - shiftX,
                ...resSignal,
            };
        });
        acc.push({
            ...newRange,
            kind: signals?.[0].kind || SignalsKinds_1.DatumKind.signal,
            originFrom: newRange.from - shiftX,
            originTo: newRange.to - shiftX,
            id: newRange.id || (0, generateID_1.default)(),
            absolute,
            signals,
        });
        return acc;
    }, []);
}
exports.mapRanges = mapRanges;
