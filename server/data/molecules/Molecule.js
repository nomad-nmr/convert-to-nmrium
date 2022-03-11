"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = exports.initMolecule = void 0;
const full_1 = require("openchemlib/full");
const generateID_1 = __importDefault(require("../utilities/generateID"));
const getAtomsFromMF_1 = __importDefault(require("../utilities/getAtomsFromMF"));
function initMolecule(options = {}) {
    const key = options.key || (0, generateID_1.default)();
    const molfile = options.molfile || '';
    const mol = full_1.Molecule.fromMolfile(molfile);
    const mfInfo = mol.getMolecularFormula();
    return {
        key,
        molfile,
        mf: mfInfo.formula,
        em: mfInfo.absoluteWeight,
        mw: mfInfo.relativeWeight,
        svg: mol.toSVG(50, 50),
        atoms: (0, getAtomsFromMF_1.default)(mfInfo.formula),
    };
}
exports.initMolecule = initMolecule;
function toJSON(molecule) {
    return {
        molfile: molecule.molfile,
    };
}
exports.toJSON = toJSON;
