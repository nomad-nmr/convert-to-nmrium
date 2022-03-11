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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiateDatum2D = void 0;
const FiltersManager = __importStar(require("../../FiltersManager"));
const generateID_1 = __importDefault(require("../../utilities/generateID"));
const getColor_1 = require("../../utilities/getColor");
const Processing2D_1 = __importStar(require("../Processing2D"));
function initiateDatum2D(options, usedColors = {}) {
    const datum = {};
    datum.id = options.id || (0, generateID_1.default)();
    datum.source = Object.assign({
        jcampURL: null,
    }, options.source);
    datum.display = Object.assign({
        name: options.display?.name ? options.display.name : (0, generateID_1.default)(),
        ...getColor(options, usedColors),
        isPositiveVisible: true,
        isNegativeVisible: true,
        isVisible: true,
        contourOptions: Processing2D_1.defaultContourOptions,
        dimension: 2,
    }, options.display);
    datum.info = Object.assign({
        nucleus: ['1H', '1H'],
        isFt: true,
        isFid: false,
        isComplex: false,
        dimension: 2,
    }, options.info);
    datum.originalInfo = datum.info;
    datum.meta = Object.assign({}, options.meta);
    datum.data = Object.assign({
        z: [],
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
    }, options.data);
    datum.originalData = datum.data;
    datum.filters = Object.assign([], options.filters);
    datum.zones = Object.assign({ values: [], options: {} }, options.zones);
    datum.processingController = new Processing2D_1.default(datum.data, datum.display.contourOptions);
    //reapply filters after load the original data
    FiltersManager.reapplyFilters(datum);
    return datum;
}
exports.initiateDatum2D = initiateDatum2D;
function getColor(options, usedColors) {
    let color = { positiveColor: 'red', negativeColor: 'blue' };
    if (options.display === undefined ||
        options.display.negativeColor === undefined ||
        options.display.positiveColor === undefined) {
        color = (0, getColor_1.get2DColor)(options.info.experiment, usedColors['2d'] || []);
    }
    if (usedColors['2d']) {
        usedColors['2d'].push(color.positiveColor);
    }
    return color;
}
