"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIntegralKind = void 0;
const SignalsKinds_1 = require("../../../constants/SignalsKinds");
/**
 * check whether integral based on its kind can be included in another operation or not
 * @param integral  integral
 * @returns {boolean}
 */
function checkIntegralKind(integral) {
    return SignalsKinds_1.SignalKindsToInclude.includes(integral.kind);
}
exports.checkIntegralKind = checkIntegralKind;
