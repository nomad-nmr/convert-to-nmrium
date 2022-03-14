"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildID = exports.ConcatenationString = void 0;
exports.ConcatenationString = '___';
function buildID(prefix, suffix) {
    return `${prefix}${exports.ConcatenationString}${suffix}`;
}
exports.buildID = buildID;
