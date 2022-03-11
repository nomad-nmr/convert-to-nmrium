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
exports.initiateDatum1D = void 0;
const merge_1 = __importDefault(require("lodash/merge"));
const FiltersTypes = __importStar(require("../../Filters"));
const FiltersManager = __importStar(require("../../FiltersManager"));
const generateID_1 = __importDefault(require("../../utilities/generateID"));
const getColor_1 = __importDefault(require("../../utilities/getColor"));
function initiateDatum1D(options, usedColors = {}) {
    const datum = {};
    datum.id = options.id || (0, generateID_1.default)();
    datum.source = Object.assign({
        jcampURL: null,
        file: {
            binary: null,
            name: '',
            extension: '',
        },
    }, options.source);
    datum.display = Object.assign({
        name: options.display?.name ? options.display.name : (0, generateID_1.default)(),
        ...getColor(options, usedColors),
        isVisible: true,
        isPeaksMarkersVisible: true,
        isRealSpectrumVisible: true,
    }, options.display);
    datum.info = Object.assign({
        nucleus: '1H',
        isFid: false,
        isComplex: false,
        dimension: 1,
    }, options.info);
    datum.originalInfo = datum.info;
    datum.meta = Object.assign({}, options.meta);
    datum.data = Object.assign({
        x: [],
        re: [],
        im: [],
    }, options.data);
    datum.originalData = datum.data;
    datum.peaks = (0, merge_1.default)({ values: [], options: {} }, options.peaks);
    // array of object {index: xIndex, xShift}
    // in case the peak does not exactly correspond to the point value
    // we can think about a second attributed `xShift`
    datum.integrals = (0, merge_1.default)({
        values: [],
        options: {
            sum: undefined,
            isSumConstant: true,
            sumAuto: true,
        },
    }, options.integrals); // array of object (from: xIndex, to: xIndex)
    datum.filters = Object.assign([], options.filters); //array of object {name: "FilterName", options: FilterOptions = {value | object} }
    datum.ranges = (0, merge_1.default)({
        values: [],
        options: {
            sum: undefined,
            isSumConstant: true,
            sumAuto: true,
        },
    }, options.ranges);
    //reapply filters after load the original data
    FiltersManager.reapplyFilters(datum);
    preprocessing(datum);
    return datum;
}
exports.initiateDatum1D = initiateDatum1D;
function getColor(options, usedColors) {
    let color = 'black';
    if (options.display === undefined || options.display.color === undefined) {
        color = (0, getColor_1.default)(false, usedColors['1d'] || []);
    }
    if (usedColors['1d']) {
        usedColors['1d'].push(color);
    }
    return { color };
}
function preprocessing(datum) {
    if (datum.info.isFid &&
        datum.filters.findIndex((f) => f.name === FiltersTypes.digitalFilter.id) ===
            -1 &&
        datum.info.digitalFilter) {
        FiltersManager.applyFilter(datum, [
            {
                name: FiltersTypes.digitalFilter.id,
                options: {
                    digitalFilterValue: datum.info.digitalFilter,
                },
                isDeleteAllow: false,
            },
        ]);
    }
}
