"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareData = exports.getDatabasesNames = exports.initiateDatabase = exports.database = void 0;
const nmr_processing_1 = require("nmr-processing");
const smart_array_filter_1 = require("smart-array-filter");
const generateID_1 = __importDefault(require("../utilities/generateID"));
exports.database = {
    data: {
        solvent: {
            description: 'Solvent database',
            value: prepareDataBase([...nmr_processing_1.protonImpurities, ...nmr_processing_1.carbonImpurities]),
        },
    },
};
function initiateDatabase(databaseKey, nucleus) {
    const databaseData = exports.database.data[databaseKey]
        ? exports.database.data[databaseKey].value
        : [];
    const data = databaseData.filter((datum) => datum.nucleus === nucleus);
    const getSolvents = () => prepareGetSolvents(data);
    const search = (keywords = []) => (0, smart_array_filter_1.filter)(data, { keywords });
    return { data, getSolvents, search };
}
exports.initiateDatabase = initiateDatabase;
function prepareGetSolvents(data) {
    const result = [];
    const map = new Map();
    for (const item of data) {
        if (!map.has(item.solvent)) {
            map.set(item.solvent, true);
            result.push(item.solvent);
        }
    }
    return result;
}
function getDatabasesNames() {
    return Object.keys(exports.database.data).map((key) => {
        const { description } = exports.database.data[key];
        return { id: key, name: description };
    });
}
exports.getDatabasesNames = getDatabasesNames;
function prepareDataBase(array) {
    return array.map((item) => {
        item.ranges = item.ranges.map((range) => ({
            id: (0, generateID_1.default)(),
            ...range,
        }));
        return item;
    }, []);
}
function prepareData(data) {
    const result = [];
    let index = 0;
    for (const item of data) {
        let ids = [];
        const { ranges, ...restItemKeys } = item;
        for (const range of ranges) {
            ids.push(range.id || (0, generateID_1.default)());
            const { signals = [], ...restRangKeys } = range;
            for (const signal of signals) {
                const { js = [], ...restSignalKeys } = signal;
                const jsResult = mapJs(js);
                const data = {
                    ...restItemKeys,
                    ...restRangKeys,
                    ...restSignalKeys,
                    ...jsResult,
                    index,
                    id: ids,
                    ranges,
                };
                result.push(data);
            }
        }
        index++;
    }
    return result;
}
exports.prepareData = prepareData;
function mapJs(js) {
    if (js && js.length > 0) {
        const { coupling, multiplicity } = js.reduce((acc, { coupling, multiplicity }) => {
            acc.coupling.push(coupling.toFixed(1));
            acc.multiplicity += multiplicity;
            return acc;
        }, { coupling: [], multiplicity: '' });
        return { multiplicity, coupling: coupling.join(',') };
    }
    else {
        return { multiplicity: 's', coupling: '' };
    }
}
