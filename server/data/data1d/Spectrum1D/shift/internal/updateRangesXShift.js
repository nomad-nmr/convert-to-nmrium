"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRangesXShift = void 0;
function updateRangesXShift(datum, shiftValue) {
    datum.ranges.values = datum.ranges.values.map((range) => ({
        ...range,
        from: (range.originFrom || 0) + shiftValue,
        to: (range.originTo || 0) + shiftValue,
        signals: range?.signals &&
            range.signals.map((s) => ({
                ...s,
                delta: (s.originDelta || 0) + shiftValue,
            })),
    }));
}
exports.updateRangesXShift = updateRangesXShift;
