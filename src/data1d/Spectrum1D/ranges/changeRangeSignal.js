"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeRangeSignal = void 0;
function changeRangeSignal(datum, options) {
    const { rangeID, signalID, newSignalValue } = options;
    let shiftValue = 0;
    const rangeIndex = datum.ranges.values.findIndex((range) => range.id === rangeID);
    if (rangeIndex !== -1) {
        const signalIndex = datum.ranges.values[rangeIndex].signals.findIndex((signal) => signal.id === signalID);
        shiftValue =
            newSignalValue -
                datum.ranges.values[rangeIndex].signals[signalIndex].delta;
        datum.ranges.values[rangeIndex].signals[signalIndex].delta = newSignalValue;
    }
    return shiftValue;
}
exports.changeRangeSignal = changeRangeSignal;
