"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
const SpectraManager_1 = require("../../SpectraManager");
function toJSON(datum1D, dataExportOption) {
    return {
        id: datum1D.id,
        display: datum1D.display,
        ...(dataExportOption === SpectraManager_1.DataExportOptions.ROW_DATA ||
            (dataExportOption === SpectraManager_1.DataExportOptions.DATA_SOURCE &&
                !datum1D.source.jcampURL)
            ? {
                data: datum1D.originalData,
                info: datum1D.originalInfo,
                meta: datum1D.meta,
                source: {
                    jcampURL: null,
                },
            }
            : {
                source: {
                    jcampURL: datum1D.source.jcampURL,
                },
            }),
        peaks: datum1D.peaks,
        integrals: datum1D.integrals,
        ranges: datum1D.ranges,
        filters: datum1D.filters,
    };
}
exports.toJSON = toJSON;
