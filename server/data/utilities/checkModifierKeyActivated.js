"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkModifierKeyActivated(event) {
    const modifiersKeys = [
        'Alt',
        'AltGraph',
        'CapsLock',
        'Control',
        'Meta',
        'NumLocK',
        'ScrollLock',
        'Shift',
        'OS',
    ];
    for (const key of modifiersKeys) {
        if (event.getModifierState(key)) {
            return true;
        }
    }
    return false;
}
exports.default = checkModifierKeyActivated;
