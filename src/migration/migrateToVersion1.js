"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeKeys_1 = require("./changeKeys");
/**
 * changes from version 0 to version 1:
 * all change done on objects keys naming
 *  j         =>   js
 *  signal    =>   signals
 *  integral  =>   integration
 *  peak      =>   peaks
 *  diaID     =>   diaIDs
 *
 */
function migrateToVersion1(data) {
    if (data?.version === 1)
        return data;
    const newData = { ...data, version: 1 };
    const changedKeys = {
        j: 'js',
        signal: 'signals',
        integral: 'integration',
        peak: 'peaks',
        diaID: 'diaIDs',
    };
    for (const spectrum of newData.spectra) {
        if (spectrum.ranges) {
            spectrum.ranges = (0, changeKeys_1.changeKeys)(spectrum.ranges, changedKeys);
        }
        else if (spectrum.zones) {
            spectrum.zones = (0, changeKeys_1.changeKeys)(spectrum.zones, changedKeys);
        }
    }
    return newData;
}
exports.default = migrateToVersion1;
