"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findZone = exports.findSpectrum = exports.findSignal2D = exports.findSignal1D = exports.findRangeOrZoneID = exports.findRange = void 0;
function findSpectrum(spectraData, spectrumID, checkIsVisible) {
    const spectrum = spectraData.find((_spectrum) => _spectrum.id === spectrumID);
    if (spectrum &&
        checkIsVisible === true &&
        spectrum.display.isVisible === false) {
        return undefined;
    }
    return spectrum;
}
exports.findSpectrum = findSpectrum;
function findSignal1D(spectrum, signalID) {
    for (let range of spectrum.ranges.values) {
        const signalIndex = range.signals.findIndex((_signal) => _signal.id === signalID);
        if (signalIndex >= 0) {
            return range.signals[signalIndex];
        }
    }
}
exports.findSignal1D = findSignal1D;
function findSignal2D(spectrum, signalID) {
    for (let zone of spectrum.zones.values) {
        const signalIndex = zone.signals.findIndex((_signal) => _signal.id === signalID);
        if (signalIndex >= 0) {
            return zone.signals[signalIndex];
        }
    }
}
exports.findSignal2D = findSignal2D;
function findRange(spectrum, signalID) {
    for (let range of spectrum.ranges.values) {
        const signalIndex = range.signals.findIndex((_signal) => _signal.id === signalID);
        if (signalIndex >= 0) {
            return range;
        }
    }
}
exports.findRange = findRange;
function findZone(spectrum, signalID) {
    for (let zone of spectrum.zones.values) {
        const signalIndex = zone.signals.findIndex((_signal) => _signal.id === signalID);
        if (signalIndex >= 0) {
            return zone;
        }
    }
}
exports.findZone = findZone;
function findRangeOrZoneID(spectraData, experimentID, signalID, checkIsVisible) {
    const spectrum = findSpectrum(spectraData, experimentID, checkIsVisible);
    if (spectrum) {
        if (spectrum.info.dimension === 1) {
            const range = findRange(spectrum, signalID);
            if (range)
                return range.id;
        }
        else if (spectrum.info.dimension === 2) {
            const zone = findZone(spectrum, signalID);
            if (zone)
                return zone.id;
        }
    }
}
exports.findRangeOrZoneID = findRangeOrZoneID;
