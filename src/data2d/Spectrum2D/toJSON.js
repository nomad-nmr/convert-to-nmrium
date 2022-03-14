"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
const SpectraManager_1 = require("../../SpectraManager");
function toJSON(datum, dataExportOption) {
    return {
        id: datum.id,
        ...(dataExportOption === SpectraManager_1.DataExportOptions.ROW_DATA ||
            (dataExportOption === SpectraManager_1.DataExportOptions.DATA_SOURCE &&
                !datum.source.jcampURL)
            ? {
                data: datum.originalData,
                info: datum.originalInfo,
                meta: datum.meta,
                source: {
                    jcampURL: null,
                },
            }
            : {
                source: {
                    jcampURL: datum.source.jcampURL,
                },
            }),
        zones: datum.zones,
        filters: datum.filters,
        display: datum.display,
    };
}
exports.toJSON = toJSON;
