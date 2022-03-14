"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShift = void 0;
const getShift_1 = require("./getShift");
function updateShift(datum) {
    const { xShift, yShift } = (0, getShift_1.getShift)(datum);
    updateZonesShift(datum, {
        xShift,
        yShift,
    });
}
exports.updateShift = updateShift;
function updateZonesShift(datum, { xShift, yShift }) {
    datum.zones.values = datum.zones.values.map((zone) => ({
        ...zone,
        signals: zone.signals?.map((signal) => ({
            ...signal,
            x: { ...signal.x, delta: signal.x.originDelta + xShift },
            y: { ...signal.y, delta: signal.y.originDelta + yShift },
        })),
    }));
}
