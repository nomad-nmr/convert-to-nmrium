"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectZonesManual = void 0;
const SignalsKinds_1 = require("../../../constants/SignalsKinds");
const generateID_1 = __importDefault(require("../../../utilities/generateID"));
const getShift_1 = require("../shift/getShift");
const getDetectionZones_1 = require("./getDetectionZones");
/**
 *
 * @param {object} options
 * @param {object} options.selectedZone
 * @param {number} options.selectedZone.fromX
 * @param {number} options.selectedZone.fromY
 * @param {number} options.selectedZone.toX
 * @param {number} options.selectedZone.toY
 * @param {number} options.thresholdFactor
 * @param {boolean} options.convolutionByFFT
 */
function detectZonesManual(datum, options) {
    const zones = (0, getDetectionZones_1.getDetectionZones)(datum, options);
    const { xShift, yShift } = (0, getShift_1.getShift)(datum);
    const formattedZones = zones.map((zone) => {
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
                kind: signal.kind || 'signal',
            };
        });
        return {
            id: (0, generateID_1.default)(),
            x: zone.x,
            y: zone.y,
            signals,
            kind: SignalsKinds_1.DatumKind.signal,
        };
    }, []);
    return formattedZones;
}
exports.detectZonesManual = detectZonesManual;
