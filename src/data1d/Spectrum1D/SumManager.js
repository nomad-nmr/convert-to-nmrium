"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeSpectraRelativeSum = exports.getAtoms = exports.setSumOptions = exports.getSum = exports.initSumOptions = void 0;
const getAtom_1 = __importDefault(require("../../utilities/getAtom"));
const _1 = require(".");
function initSumOptions(options, params) {
    let newOptions = { ...options };
    const { molecules, nucleus } = params;
    if (options.sumAuto && Array.isArray(molecules) && molecules.length > 0) {
        const { mf, key } = molecules[0];
        newOptions = { ...newOptions, sumAuto: true, mf, moleculeKey: key };
    }
    else {
        const { mf, moleculeKey, ...resOptions } = newOptions;
        newOptions = { ...resOptions, sumAuto: false };
    }
    if (!newOptions.sum) {
        newOptions.sum = getSum(newOptions.mf || null, nucleus);
    }
    return newOptions;
}
exports.initSumOptions = initSumOptions;
function getSum(mf, nucleus) {
    const defaultSum = 100;
    if (!mf || !nucleus)
        return defaultSum;
    const atom = (0, getAtom_1.default)(nucleus);
    const atoms = getAtoms(mf);
    return atoms[atom] ? atoms[atom] : defaultSum;
}
exports.getSum = getSum;
function setSumOptions(data, params) {
    const { nucleus, options } = params;
    if (options.sumAuto) {
        const { mf, moleculeKey } = options;
        const sum = getSum(mf, nucleus);
        data.options = { ...data.options, sumAuto: true, moleculeKey, mf, sum };
    }
    else {
        const { mf, moleculeKey, ...resOptions } = data.options;
        data.options = { ...resOptions, sumAuto: false, sum: options.sum };
    }
}
exports.setSumOptions = setSumOptions;
function getAtoms(mf) {
    const result = {};
    // eslint-disable-next-line prefer-named-capture-group
    const data = mf.split(/(\d+)/);
    for (let i = 0; i < data.length - 1; i = i + 2) {
        result[data[i]] = Number(data[i + 1]);
    }
    return result;
}
exports.getAtoms = getAtoms;
/**
 * change the sum for ranges and integrals in all spectra based on molecule
 * it handle three cases
 * 1 - edit and existing molecule
 * 2- delete molecule / edit molecule and as a result of that it generate more than one molecule
 * 3- add a molecule for the first time
 * @param draft     State draft
 * @param molKey    Molecule key
 * @param molecule  Molecules list
 */
function changeSpectraRelativeSum(draft, molKey, molecule) {
    const keys = ['ranges', 'integrals'];
    for (const spectrum of draft.data) {
        if ((0, _1.isSpectrum1D)(spectrum)) {
            for (const key of keys) {
                const { moleculeKey, mf, sumAuto } = spectrum[key].options;
                if ((molKey === moleculeKey || (!moleculeKey && !mf)) && sumAuto) {
                    const options = molecule
                        ? {
                            mf: molecule.mf,
                            moleculeKey: molecule.key,
                        }
                        : {
                            mf: undefined,
                            moleculeKey: undefined,
                        };
                    setSumOptions(spectrum[key], {
                        nucleus: spectrum.info.nucleus,
                        options: { ...options, sumAuto: true, sum: undefined },
                    });
                    (0, _1.updateRangesRelativeValues)(spectrum, true);
                    (0, _1.updateIntegralsRelativeValues)(spectrum, true);
                }
            }
        }
    }
}
exports.changeSpectraRelativeSum = changeSpectraRelativeSum;
