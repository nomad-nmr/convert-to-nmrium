"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMolfile = exports.addMolfile = exports.fromJSON = void 0;
const full_1 = require("openchemlib/full");
const Molecule_1 = require("./Molecule");
function fromJSON(mols = []) {
    const molecules = [];
    for (const mol of mols) {
        const molecule = full_1.Molecule.fromMolfile(mol.molfile);
        const fragments = molecule.getFragments();
        for (let fragment of fragments) {
            molecules.push((0, Molecule_1.initMolecule)({
                molfile: fragment.toMolfileV3(),
            }));
        }
    }
    return molecules;
}
exports.fromJSON = fromJSON;
function addMolfile(molecules, molfile) {
    // try to parse molfile
    // this will throw if the molecule can not be parsed !
    const molecule = full_1.Molecule.fromMolfile(molfile);
    let fragments = molecule.getFragments();
    for (let fragment of fragments) {
        molecules.push((0, Molecule_1.initMolecule)({
            molfile: fragment.toMolfileV3(),
        }));
    }
    // we will split if we have many fragments
}
exports.addMolfile = addMolfile;
function setMolfile(molecules, molfile, key) {
    // try to parse molfile
    // this will throw if the molecule can not be parsed !
    let molecule = full_1.Molecule.fromMolfile(molfile);
    let fragments = molecule.getFragments();
    if (fragments.length > 1) {
        molecules = molecules.filter((m) => m.key !== key);
        for (let fragment of fragments) {
            molecules.push((0, Molecule_1.initMolecule)({
                molfile: fragment.toMolfileV3(),
            }));
        }
    }
    else if (fragments.length === 1) {
        const fragment = fragments[0];
        const _mol = (0, Molecule_1.initMolecule)({
            molfile: fragment.toMolfileV3(),
            key: key,
        });
        let molIndex = molecules.findIndex((m) => m.key === key);
        molecules.splice(molIndex, 1, _mol);
    }
    // we will split if we have many fragments
}
exports.setMolfile = setMolfile;
