"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShift = void 0;
const Filters = __importStar(require("../../../Filters"));
function getShift(datum) {
    let shift = { xShift: 0, yShift: 0 };
    if (datum?.filters) {
        shift = datum.filters.reduce((acc, filter) => {
            if (filter.name === Filters.shift2DX.id) {
                acc.xShift = filter?.flag ? filter.value : 0;
            }
            if (filter.name === Filters.shift2DY.id) {
                acc.yShift = filter?.flag ? filter.value : 0;
            }
            return acc;
        }, { xShift: 0, yShift: 0 });
    }
    return shift;
}
exports.getShift = getShift;
