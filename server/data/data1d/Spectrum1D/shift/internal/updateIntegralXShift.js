"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIntegralXShift = void 0;
function updateIntegralXShift(datum, shiftValue) {
    datum.integrals.values = datum.integrals.values.map((integral) => ({
        ...integral,
        from: integral.originFrom + shiftValue,
        to: integral.originTo + shiftValue,
    }));
}
exports.updateIntegralXShift = updateIntegralXShift;
