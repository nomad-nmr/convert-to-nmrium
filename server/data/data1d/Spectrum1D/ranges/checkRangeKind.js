"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRangeKind = void 0;
const SignalsKinds_1 = require("../../../constants/SignalsKinds");
const RangeUtilities_1 = require("../../../utilities/RangeUtilities");
function checkRangeKind(range) {
    return range.signals && (0, RangeUtilities_1.checkSignalKinds)(range, SignalsKinds_1.SignalKindsToInclude);
}
exports.checkRangeKind = checkRangeKind;
