"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRangesRelativeValues = void 0;
const updateRelatives_1 = require("../integrals/updateRelatives");
const checkRangeKind_1 = require("./checkRangeKind");
function updateRangesRelativeValues(datum, forceCalculateIntegral = false) {
    (0, updateRelatives_1.updateRelatives)(datum.ranges, 'integration', checkRangeKind_1.checkRangeKind, forceCalculateIntegral);
}
exports.updateRangesRelativeValues = updateRangesRelativeValues;
