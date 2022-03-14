"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeZoneSignal = void 0;
/**
 *
 * @param {number} zoneID
 * @param {object} signal
 * @param {number} signal.x
 * @param {number} signal.y
 * @param {string} signal.id
 */
function changeZoneSignal(datum, zoneID, newSignal) {
    const zoneIndex = datum.zones.values.findIndex((zone) => zone.id === zoneID);
    if (zoneIndex !== -1) {
        const signalIndex = datum.zones.values[zoneIndex].signals.findIndex((s) => s.id === newSignal.id);
        const zone = datum.zones.values[zoneIndex];
        if (signalIndex !== -1) {
            const originalSignal = zone.signals[signalIndex];
            const xShift = newSignal?.x || newSignal?.x === 0
                ? newSignal.x - originalSignal.x.delta
                : 0;
            const yShift = newSignal?.y || newSignal?.y === 0
                ? newSignal.y - originalSignal.y?.delta
                : 0;
            return { xShift, yShift };
        }
    }
    return { xShift: 0, yShift: 0 };
}
exports.changeZoneSignal = changeZoneSignal;
