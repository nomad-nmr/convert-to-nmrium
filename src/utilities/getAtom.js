"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAtom(nucleus) {
    return nucleus.replace(/[0-9]/g, '');
}
exports.default = getAtom;
