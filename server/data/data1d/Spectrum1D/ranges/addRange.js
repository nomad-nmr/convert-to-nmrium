"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRange = void 0;
const ml_spectra_processing_1 = require("ml-spectra-processing");
const SignalsKinds_1 = require("../../../constants/SignalsKinds");
const generateID_1 = __importDefault(require("../../../utilities/generateID"));
const SumManager_1 = require("../SumManager");
const detectSignal_1 = __importDefault(require("./detectSignal"));
const mapRanges_1 = require("./mapRanges");
const updateRangesRelativeValues_1 = require("./updateRangesRelativeValues");
function addRange(datum, options) {
    const { from, to, molecules, nucleus } = options;
    const { x, re } = datum.data;
    const absolute = (0, ml_spectra_processing_1.xyIntegration)({ x, y: re }, { from, to, reverse: true });
    const signals = (0, detectSignal_1.default)(x, re, from, to, datum.info.originFrequency);
    try {
        const range = {
            id: (0, generateID_1.default)(),
            from,
            to,
            absolute,
            signals: [{ id: (0, generateID_1.default)(), ...signals }],
            kind: SignalsKinds_1.DatumKind.signal,
            integration: 0,
        };
        datum.ranges.options = (0, SumManager_1.initSumOptions)(datum.ranges.options, {
            molecules,
            nucleus,
        });
        datum.ranges.values = datum.ranges.values.concat((0, mapRanges_1.mapRanges)([range], datum));
        (0, updateRangesRelativeValues_1.updateRangesRelativeValues)(datum);
    }
    catch (e) {
        throw new Error('Could not calculate the multiplicity');
    }
}
exports.addRange = addRange;
