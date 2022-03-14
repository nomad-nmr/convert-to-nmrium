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
exports.deleteFilter = exports.addFilter = exports.enableFilter = exports.reapplyFilters = exports.applyFilter = void 0;
/* eslint-disable import/namespace */
const Filters = __importStar(require("./Filters"));
const generateID_1 = __importDefault(require("./utilities/generateID"));
/***
 * @param {object} Filters [{name:'',options:{}},{...}]
 */
function applyFilter(datum, filters = []) {
    let isReduced = false;
    for (let filter of filters) {
        const filterOption = {
            name: filter.name,
            label: Filters[filter.name].name,
            value: filter.options,
        };
        const previousFilter = lookupForFilter(datum, filter.name);
        if (previousFilter) {
            const reduceResult = Filters[filter.name].reduce(previousFilter.value, filterOption.value);
            if (reduceResult.once) {
                if (!isReduced) {
                    isReduced = true;
                }
                if (reduceResult.reduce != null && reduceResult.reduce !== undefined) {
                    replaceFilter(datum, previousFilter.id, reduceResult.reduce);
                }
            }
            else {
                addFilter(datum, filterOption, Object.prototype.hasOwnProperty.call(filter, 'isDeleteAllow')
                    ? filter.isDeleteAllow
                    : true);
            }
        }
        else {
            addFilter(datum, filterOption, Object.prototype.hasOwnProperty.call(filter, 'isDeleteAllow')
                ? filter.isDeleteAllow
                : true);
        }
    }
    if (isReduced) {
        if (filters.length === 1 && isLastFilter(datum, filters[0].name)) {
            Filters[filters[0].name].apply(datum, filters[0].options);
        }
        else {
            reapplyFilters(datum);
        }
    }
    else {
        for (let filter of filters) {
            Filters[filter.name].apply(datum, filter.options);
        }
    }
}
exports.applyFilter = applyFilter;
function isLastFilter(datum, id) {
    const index = datum.filters.findIndex((f) => f.name === id);
    if (datum.filters.length === index + 1) {
        return true;
    }
    return false;
}
function lookupForFilter(datum, filterName) {
    return datum.filters.find((f) => f.name === filterName);
}
function reapplyFilters(datum, filters = null) {
    const _filters = filters ? filters : datum.filters;
    enableFilter(datum, null, null, _filters);
}
exports.reapplyFilters = reapplyFilters;
// id filter id
function enableFilter(datum, id, checked, filters = null) {
    datum.filters = datum.filters.slice(0);
    if (id) {
        datum.filters = datum.filters.map((filter) => {
            return { ...filter, flag: filter.id === id ? checked : filter.flag };
        }, []);
    }
    datum.data = { ...datum.data, ...datum.originalData };
    datum.info = { ...datum.info, ...datum.originalInfo };
    const _filters = filters ? filters : datum.filters;
    for (let filterIndex in _filters) {
        const filter = datum.filters[filterIndex];
        datum.filters[filterIndex] = {
            ...datum.filters[filterIndex],
            error: null,
        };
        if (filter.flag) {
            try {
                Filters[filter.name].apply(datum, filter.value);
            }
            catch (error) {
                datum.filters[filterIndex] = {
                    ...datum.filters[filterIndex],
                    error: error.message,
                };
            }
        }
    }
}
exports.enableFilter = enableFilter;
function deleteFilter(datum, id) {
    datum.filters = datum.filters.slice(0);
    datum.filters = datum.filters.filter((filter) => filter.id !== id);
    datum.data = { ...datum.data, ...datum.originalData };
    datum.info = { ...datum.info, ...datum.originalInfo };
    for (let filterIndex in datum.filters) {
        const filter = datum.filters[filterIndex];
        datum.filters[filterIndex] = {
            ...datum.filters[filterIndex],
            error: null,
        };
        if (filter.flag) {
            try {
                Filters[filter.name].apply(datum, filter.value);
            }
            catch (error) {
                datum.filters[filterIndex] = {
                    ...datum.filters[filterIndex],
                    error: error.message,
                };
            }
        }
    }
}
exports.deleteFilter = deleteFilter;
function addFilter(datum, filter, isDeleteAllow = true) {
    const id = (0, generateID_1.default)();
    datum.filters = datum.filters.slice(0);
    delete filter.isSnapshot;
    datum.filters.push({
        ...filter,
        id: id,
        flag: true,
        isDeleteAllow,
    });
}
exports.addFilter = addFilter;
function replaceFilter(datum, filterID, value) {
    datum.filters = datum.filters.slice(0);
    const index = datum.filters.findIndex((f) => f.id === filterID);
    delete datum.filters[index].isSnapshot;
    datum.filters[index] = {
        ...datum.filters[index],
        value,
    };
}
