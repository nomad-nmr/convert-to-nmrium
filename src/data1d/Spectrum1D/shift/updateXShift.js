"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateXShift = void 0;
const getShiftX_1 = require("./getShiftX");
const updateIntegralXShift_1 = require("./internal/updateIntegralXShift");
const updatePeaksXShift_1 = require("./internal/updatePeaksXShift");
const updateRangesXShift_1 = require("./internal/updateRangesXShift");
function updateXShift(datum) {
    const shiftX = (0, getShiftX_1.getShiftX)(datum);
    (0, updatePeaksXShift_1.updatePeaksXShift)(datum, shiftX);
    (0, updateRangesXShift_1.updateRangesXShift)(datum, shiftX);
    (0, updateIntegralXShift_1.updateIntegralXShift)(datum, shiftX);
}
exports.updateXShift = updateXShift;
