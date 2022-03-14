"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeakLabelNumberDecimals = void 0;
const _13c_1 = __importDefault(require("./13c"));
const _1h_1 = __importDefault(require("./1h"));
const defaults = {
    '1h': _1h_1.default,
    '13c': _13c_1.default,
};
function getPeakLabelNumberDecimals(nucleus) {
    return defaults[getNucleus(nucleus)].peakLabelNumberDecimals;
}
exports.getPeakLabelNumberDecimals = getPeakLabelNumberDecimals;
function getNucleus(nucleus = '1h') {
    nucleus = nucleus.toLowerCase();
    if (!defaults[nucleus]) {
        return '1h';
    }
    return nucleus;
}
