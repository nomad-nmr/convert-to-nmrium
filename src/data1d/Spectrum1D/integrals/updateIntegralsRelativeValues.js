"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIntegralsRelativeValues = void 0;
const checkIntegralKind_1 = require("./checkIntegralKind");
const updateRelatives_1 = require("./updateRelatives");
function updateIntegralsRelativeValues(datum, forceCalculateIntegral = false) {
    (0, updateRelatives_1.updateRelatives)(datum.integrals, 'integral', checkIntegralKind_1.checkIntegralKind, forceCalculateIntegral);
}
exports.updateIntegralsRelativeValues = updateIntegralsRelativeValues;
