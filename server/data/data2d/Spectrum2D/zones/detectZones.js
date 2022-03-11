"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectZones = void 0;
const SignalsKinds_1 = require("../../../constants/SignalsKinds");
const generateID_1 = __importDefault(require("../../../utilities/generateID"));
const getShift_1 = require("../shift/getShift");
const getDetectionZones_1 = require("./getDetectionZones");
function detectZones(datum, options) {
    const zones = (0, getDetectionZones_1.getDetectionZones)(datum, options);
    const { xShift, yShift } = (0, getShift_1.getShift)(datum);
    const { minX, maxX, minY, maxY } = datum.data;
    const xError = Math.abs(maxX - minX) / 10000;
    const yError = Math.abs(maxY - minY) / 10000;
    const formattedZones = zones.reduce((acc, zone) => {
        const newXRange = zone.x || { from: 0, to: 0 };
        const newYRange = zone.y || { from: 0, to: 0 };
        // check if the zone is already exists
        for (const { x, y } of datum.zones.values) {
            if (Math.abs(newXRange.from - x.from) < xError &&
                Math.abs(newXRange.to - x.to) < xError &&
                Math.abs(newYRange.from - y.from) < yError &&
                Math.abs(newYRange.to - y.to) < yError) {
                return acc;
            }
        }
        const signals = zone.signals.map((signal) => {
            return {
                id: (0, generateID_1.default)(),
                peaks: signal.peaks,
                x: {
                    originDelta: signal.x.delta - xShift,
                    ...signal.x,
                },
                y: {
                    originDelta: signal.y.delta - yShift,
                    ...signal.y,
                },
                kind: 'signal',
            };
        });
        acc.push({
            id: (0, generateID_1.default)(),
            x: { from: newXRange.from, to: newXRange.to },
            y: { from: newYRange.from, to: newYRange.to },
            signals,
            kind: SignalsKinds_1.DatumKind.signal,
        });
        return acc;
    }, []);
    return formattedZones;
}
exports.detectZones = detectZones;
