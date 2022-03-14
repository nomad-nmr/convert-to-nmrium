"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectRanges = void 0;
const SumManager_1 = require("../SumManager");
const autoRangesDetection_1 = __importDefault(require("./autoRangesDetection"));
const mapRanges_1 = require("./mapRanges");
const updateRangesRelativeValues_1 = require("./updateRangesRelativeValues");
function detectRanges(datum, options) {
    const { molecules, nucleus, ...detectOptions } = options;
    detectOptions.impurities = { solvent: datum.info.solvent || '' };
    const ranges = (0, autoRangesDetection_1.default)(datum, detectOptions);
    datum.ranges.options = (0, SumManager_1.initSumOptions)(datum.ranges.options, {
        molecules,
        nucleus,
    });
    datum.ranges.values = datum.ranges.values.concat((0, mapRanges_1.mapRanges)(ranges, datum));
    (0, updateRangesRelativeValues_1.updateRangesRelativeValues)(datum);
}
exports.detectRanges = detectRanges;
