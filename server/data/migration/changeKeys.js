"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeKeys = void 0;
function changeKeys(data, changedKeys) {
    return JSON.parse(JSON.stringify(data), function reviver(key, value) {
        if (key in changedKeys) {
            this[changedKeys[key]] = value;
            return;
        }
        return value;
    });
}
exports.changeKeys = changeKeys;
