"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkInAssignmentData = exports.checkSignalKinds = exports.checkRangeKind = exports.addDefaultSignal = exports.unlink = exports.resetDiaIDs = exports.setNbAtoms = exports.getNbAtoms = exports.getDiaIDs = void 0;
const SignalsKinds_1 = require("../constants/SignalsKinds");
function getDiaIDs(range) {
    return [].concat(range.diaIDs || [], range.signals
        ? range.signals.map((_signal) => _signal.diaIDs || []).flat()
        : []);
}
exports.getDiaIDs = getDiaIDs;
function getNbAtoms(range, signalIndex) {
    if (signalIndex === undefined) {
        return range.signals
            ? range.signals.reduce((sum, signal) => (signal.nbAtoms ? signal.nbAtoms + sum : sum), 0)
            : 0;
    }
    return range.signals[signalIndex].nbAtoms || 0;
}
exports.getNbAtoms = getNbAtoms;
function setNbAtoms(range, signalIndex) {
    range.nbAtoms = getNbAtoms(range, signalIndex);
    if (range.nbAtoms === 0) {
        delete range.nbAtoms;
    }
}
exports.setNbAtoms = setNbAtoms;
function resetDiaIDs(range) {
    delete range.diaIDs;
    delete range.nbAtoms;
    range.signals.forEach((_signal) => {
        delete _signal.diaIDs;
        delete _signal.nbAtoms;
    });
    delete range.nbAtoms;
}
exports.resetDiaIDs = resetDiaIDs;
/**
 *
 * @param {object} range
 * @param {String('both' | 'range' | 'signal')} unlinkType
 * @param {object} options
 * @param {number} [options.signalIndex]
 * @returns {object}
 */
function unlink(range, unlinkType = 'both', options = {}) {
    switch (unlinkType) {
        case 'both':
            resetDiaIDs(range);
            break;
        case 'range':
            delete range.diaIDs;
            delete range.nbAtoms;
            break;
        case 'signal':
            delete range.signals[options.signalIndex].diaIDs;
            delete range.signals[options.signalIndex].nbAtoms;
            break;
        default:
            break;
    }
    setNbAtoms(range);
    return range;
}
exports.unlink = unlink;
function addDefaultSignal(range) {
    range.signals.push({
        multiplicity: 'm',
        kind: 'signal',
        delta: (range.to + range.from) / 2,
    });
}
exports.addDefaultSignal = addDefaultSignal;
function checkRangeKind(range) {
    return range.kind === SignalsKinds_1.DatumKind.signal;
}
exports.checkRangeKind = checkRangeKind;
function checkSignalKinds(range, kinds) {
    return !range.signals.some((_signal) => _signal.kind === undefined || !kinds.includes(_signal.kind));
}
exports.checkSignalKinds = checkSignalKinds;
function unlinkInAssignmentData(assignmentData, ranges) {
    const ids = ranges.reduce((acc, range) => {
        if (range.id) {
            acc.push(range.id);
        }
        if (range.signals) {
            acc = acc.concat(range.signals.map((signal) => signal.id, []));
        }
        return acc;
    }, []);
    assignmentData.dispatch({
        type: 'REMOVE_ALL',
        payload: { id: ids, axis: 'x' },
    });
}
exports.unlinkInAssignmentData = unlinkInAssignmentData;
