"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.isApplicable = exports.apply = exports.baselineAlgorithms = exports.name = exports.id = void 0;
const ml_airpls_1 = __importDefault(require("ml-airpls"));
const ml_array_xy_equally_spaced_1 = __importDefault(require("ml-array-xy-equally-spaced"));
const ml_baseline_correction_regression_1 = __importDefault(require("ml-baseline-correction-regression"));
exports.id = 'baselineCorrection';
exports.name = 'Baseline correction';
/**
 *
 * @param {Datum1d} datum1d
 */
exports.baselineAlgorithms = {
    airpls: 'airPLS',
    polynomial: 'Polynomial',
};
function apply(datum1D, options = {}) {
    if (!isApplicable(datum1D)) {
        throw new Error('baselineCorrection not applicable on this data');
    }
    const { algorithm, zones = [] } = options;
    let { x, re } = datum1D.data;
    let corrected;
    switch (algorithm) {
        case 'airpls':
            corrected = (0, ml_airpls_1.default)(x, re, options).corrected;
            break;
        case 'polynomial':
            {
                const baselineOptions = {
                    regressionOptions: options.degree,
                };
                let reduced = (0, ml_array_xy_equally_spaced_1.default)({ x, y: re }, { numberOfPoints: 4096, zones });
                let result = (0, ml_baseline_correction_regression_1.default)(reduced.x, reduced.y, baselineOptions);
                let { regression } = result;
                corrected = new Float64Array(x.length);
                for (let i = 0; i < re.length; i++) {
                    corrected[i] = re[i] - regression.predict(x[i]);
                }
            }
            break;
        default:
            throw new Error(`baselineCorrection: algorithm unknown: ${algorithm}`);
    }
    Object.assign(datum1D.data, { re: corrected });
}
exports.apply = apply;
function isApplicable(datum1D) {
    if (!datum1D.info.isFid)
        return true;
    return false;
}
exports.isApplicable = isApplicable;
function reduce() {
    return {
        once: false,
        reduce: null,
    };
}
exports.reduce = reduce;
