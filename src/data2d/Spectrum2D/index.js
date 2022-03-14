"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShift = exports.updateShift = exports.getSlice = exports.getMissingProjection = exports.detectZonesManual = exports.detectZones = exports.changeZoneSignal = exports.toJSON = exports.isSpectrum2D = exports.initiateDatum2D = void 0;
const getMissingProjection_1 = require("./getMissingProjection");
Object.defineProperty(exports, "getMissingProjection", { enumerable: true, get: function () { return getMissingProjection_1.getMissingProjection; } });
const getSlice_1 = require("./getSlice");
Object.defineProperty(exports, "getSlice", { enumerable: true, get: function () { return getSlice_1.getSlice; } });
const initiateDatum2D_1 = require("./initiateDatum2D");
Object.defineProperty(exports, "initiateDatum2D", { enumerable: true, get: function () { return initiateDatum2D_1.initiateDatum2D; } });
const isSpectrum2D_1 = require("./isSpectrum2D");
Object.defineProperty(exports, "isSpectrum2D", { enumerable: true, get: function () { return isSpectrum2D_1.isSpectrum2D; } });
const getShift_1 = require("./shift/getShift");
Object.defineProperty(exports, "getShift", { enumerable: true, get: function () { return getShift_1.getShift; } });
const updateShift_1 = require("./shift/updateShift");
Object.defineProperty(exports, "updateShift", { enumerable: true, get: function () { return updateShift_1.updateShift; } });
const toJSON_1 = require("./toJSON");
Object.defineProperty(exports, "toJSON", { enumerable: true, get: function () { return toJSON_1.toJSON; } });
const changeZoneSignal_1 = require("./zones/changeZoneSignal");
Object.defineProperty(exports, "changeZoneSignal", { enumerable: true, get: function () { return changeZoneSignal_1.changeZoneSignal; } });
const detectZones_1 = require("./zones/detectZones");
Object.defineProperty(exports, "detectZones", { enumerable: true, get: function () { return detectZones_1.detectZones; } });
const detectZonesManual_1 = require("./zones/detectZonesManual");
Object.defineProperty(exports, "detectZonesManual", { enumerable: true, get: function () { return detectZonesManual_1.detectZonesManual; } });