"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataAsString = exports.deleteSpectraAnalysis = exports.analyzeSpectra = exports.setColumn = exports.changeColumnValueKey = exports.getSpectraAnalysis = exports.getValue = exports.getColumns = exports.COLUMNS_VALUES_KEYS = exports.COLUMNS_TYPES = void 0;
const get_1 = __importDefault(require("lodash/get"));
const generateChar_1 = __importDefault(require("../utilities/generateChar"));
const Spectrum1D_1 = require("./Spectrum1D");
var COLUMNS_TYPES;
(function (COLUMNS_TYPES) {
    COLUMNS_TYPES["NORMAL"] = "NORMAL";
    COLUMNS_TYPES["FORMULA"] = "FORMULA";
})(COLUMNS_TYPES = exports.COLUMNS_TYPES || (exports.COLUMNS_TYPES = {}));
var COLUMNS_VALUES_KEYS;
(function (COLUMNS_VALUES_KEYS) {
    COLUMNS_VALUES_KEYS["RELATIVE"] = "relative";
    COLUMNS_VALUES_KEYS["ABSOLUTE"] = "absolute";
    COLUMNS_VALUES_KEYS["MIN"] = "min";
    COLUMNS_VALUES_KEYS["MAX"] = "max";
})(COLUMNS_VALUES_KEYS = exports.COLUMNS_VALUES_KEYS || (exports.COLUMNS_VALUES_KEYS = {}));
function addColumnKey(spectraAnalysis, nucleus, columnProps, columnKey) {
    const key = columnKey
        ? columnKey
        : (0, generateChar_1.default)(spectraAnalysis[nucleus].options.columnIndex).toUpperCase();
    spectraAnalysis[nucleus].options.columns[key] = columnProps;
    spectraAnalysis[nucleus].options.columnIndex++;
    return key;
}
function getColumns(spectraAnalysis, nucleus) {
    return spectraAnalysis[nucleus].options.columns;
}
exports.getColumns = getColumns;
function getValue(colKey, columns, data) {
    return data[columns[colKey].valueKey];
}
exports.getValue = getValue;
function getSpectraAnalysis(spectra, options) {
    const { from, to, nucleus } = options;
    return spectra.reduce((acc, datum) => {
        if ((0, Spectrum1D_1.isSpectrum1D)(datum) &&
            datum.info.nucleus === nucleus &&
            !datum.info.isFid) {
            const range = (0, Spectrum1D_1.detectRange)(datum, { from, to });
            acc.sum += range.absolute;
            acc.values.push({ SID: datum.id, ...range });
        }
        return acc;
    }, { values: [], sum: 0 });
}
exports.getSpectraAnalysis = getSpectraAnalysis;
function init(spectraAnalysis, nucleus) {
    if (spectraAnalysis[nucleus] === undefined) {
        spectraAnalysis[nucleus] = {
            options: {
                sum: 100,
                code: null,
                columns: {},
                columnIndex: 0,
            },
            values: {},
        };
    }
}
function changeColumnValueKey(spectraAnalysis, nucleus, columnKey, newKey) {
    spectraAnalysis[nucleus].options.columns[columnKey].valueKey = newKey;
    spectraAnalysis[nucleus].values = refreshCalculation(spectraAnalysis, nucleus);
}
exports.changeColumnValueKey = changeColumnValueKey;
function setColumn(spectraAnalysis, nucleus, { columns: inputColumns, code }) {
    init(spectraAnalysis, nucleus);
    spectraAnalysis[nucleus].options.code = code;
    spectraAnalysis[nucleus].options.columns = Object.values(inputColumns).reduce((acc, value) => {
        const data = { ...value };
        delete data.tempKey;
        acc[value.tempKey] = data;
        return acc;
    }, {});
    const { columns: newColumns } = spectraAnalysis[nucleus].options;
    let data = Object.entries(spectraAnalysis[nucleus].values).reduce((outerAcc, [spectraKey, spectra]) => {
        outerAcc[spectraKey] = Object.keys(inputColumns).reduce((acc, key) => {
            const newKey = inputColumns[key].tempKey;
            if (spectra[key]) {
                acc[newKey] = spectra[key];
            }
            return acc;
        }, {});
        return outerAcc;
    }, {});
    data = Object.entries(data).reduce((acc, spectra) => {
        acc[spectra[0]] = Object.keys(newColumns).reduce((acc, key) => {
            const isFormula = newColumns[key].type === COLUMNS_TYPES.FORMULA;
            acc[key] = isFormula
                ? {
                    colKey: key,
                    value: calculate(newColumns, data[spectra[0]], newColumns[key].formula),
                }
                : { ...spectra[1][key], colKey: key };
            return acc;
        }, {});
        return acc;
    }, {});
    spectraAnalysis[nucleus].values = data;
}
exports.setColumn = setColumn;
function refreshByRow(row, columns) {
    return Object.keys(columns).reduce((acc, key) => {
        if (columns[key].type === COLUMNS_TYPES.FORMULA) {
            acc[key] = {
                colKey: key,
                ...row,
                value: calculate(columns, row, columns[key].formula),
            };
        }
        return acc;
    }, {});
}
function refreshCalculation(spectraAnalysis, nucleus) {
    const { columns } = spectraAnalysis[nucleus].options;
    const data = Object.entries(spectraAnalysis[nucleus].values).reduce((acc, spectra) => {
        const [id, row] = spectra;
        acc[id] = {
            ...row,
            ...refreshByRow(row, columns),
        };
        return acc;
    }, {});
    return data;
}
function analyzeSpectra(spectra, spectraAnalysis, options) {
    const { from, to, nucleus, columnKey = null } = options;
    init(spectraAnalysis, nucleus);
    const colKey = addColumnKey(spectraAnalysis, nucleus, {
        type: COLUMNS_TYPES.NORMAL,
        valueKey: COLUMNS_VALUES_KEYS.RELATIVE,
        from,
        to,
        index: 1,
    }, columnKey);
    const { sum } = spectraAnalysis[nucleus].options;
    const { values: result, sum: spectraSum } = getSpectraAnalysis(spectra, {
        from,
        to,
        nucleus,
    });
    const prevNucleusData = (0, get_1.default)(spectraAnalysis, `${nucleus}.values`, {});
    let data = result.reduce((acc, row) => {
        const factor = spectraSum > 0 ? sum / spectraSum : 0.0;
        acc[row.SID] = {
            ...prevNucleusData[row.SID],
            [colKey]: {
                colKey,
                ...row,
                relative: Math.abs(row.absolute) * factor,
            },
        };
        return acc;
    }, {});
    spectraAnalysis[nucleus].values = data;
    spectraAnalysis[nucleus].values = refreshCalculation(spectraAnalysis, nucleus);
}
exports.analyzeSpectra = analyzeSpectra;
function deleteSpectraAnalysis(spectraAnalysis, colKey, nucleus) {
    const result = Object.entries(spectraAnalysis[nucleus].values).reduce((acc, item) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete item[1][colKey];
        if (item[1] && Object.keys(item[1]).length > 0) {
            acc[item[0]] = item[1];
            return acc;
        }
        return acc;
    }, {});
    const { [colKey]: deletedColumnKey, ...resColumns } = spectraAnalysis[nucleus].options.columns;
    const currentColumns = Object.keys(spectraAnalysis[nucleus].options.columns);
    if (currentColumns.length === 1) {
        spectraAnalysis[nucleus].options.columnIndex = 0;
    }
    spectraAnalysis[nucleus].options.columns = resColumns;
    spectraAnalysis[nucleus].values = result;
    spectraAnalysis[nucleus].values = refreshCalculation(spectraAnalysis, nucleus);
}
exports.deleteSpectraAnalysis = deleteSpectraAnalysis;
function calculate(columns, data, formula = '') {
    const array = formula.split(/\+|-|\*|\/|%|\(|\)/);
    const variables = [];
    for (const col of array) {
        const column = col.trim();
        if (columns[column]) {
            variables.push(column);
        }
    }
    const params = variables.map((key) => data[key] ? data[key][columns[key].valueKey] : null);
    let result;
    try {
        result = new Function(...variables, `return ${formula}`)(...params);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        result = new Error(`Invalid Formula ( ${formula} ) `);
    }
    return result;
}
function getDataAsString(spectraAnalysis, nucleus) {
    if (spectraAnalysis?.[nucleus]) {
        const { values, options: { columns }, } = spectraAnalysis[nucleus];
        let result = '';
        for (const letter in columns) {
            result += `${letter}\t`;
        }
        result += '\n';
        for (const spectrum of Object.values(values)) {
            for (const letter in columns) {
                result += `${spectrum[letter][columns[letter].valueKey]}\t`;
            }
            result += '\n';
        }
        return result;
    }
    return null;
}
exports.getDataAsString = getDataAsString;
