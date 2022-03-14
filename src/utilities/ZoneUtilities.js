"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkInAssignmentData = exports.unlink = exports.checkSignalKinds = exports.checkZoneKind = exports.resetDiaIDs = exports.setNbAtoms = exports.getNbAtoms = exports.getDiaIDs = void 0;
const SignalsKinds_1 = require("../constants/SignalsKinds");
function getDiaIDs(zone, axis) {
    return [].concat(zone[axis].diaIDs || [], zone.signals
        ? zone.signals.map((signal) => signal[axis].diaIDs || []).flat()
        : []);
}
exports.getDiaIDs = getDiaIDs;
function getNbAtoms(zone, axis) {
    return zone.signals
        ? zone.signals.reduce((sum, signal) => signal[axis].nbAtoms ? sum + signal[axis].nbAtoms : sum, 0)
        : 0;
}
exports.getNbAtoms = getNbAtoms;
function setNbAtoms(zone, axis) {
    zone[axis].nbAtoms = getNbAtoms(zone, axis);
    if (zone[axis].nbAtoms === 0) {
        delete zone[axis].nbAtoms;
    }
}
exports.setNbAtoms = setNbAtoms;
function resetDiaIDs(zone, axis) {
    delete zone[axis].diaIDs;
    delete zone[axis].nbAtoms;
    zone.signals.forEach((signal) => {
        delete signal[axis].diaIDs;
        delete signal[axis].nbAtoms;
    });
    return zone;
}
exports.resetDiaIDs = resetDiaIDs;
function checkZoneKind(zone) {
    return zone.kind === SignalsKinds_1.DatumKind.signal;
}
exports.checkZoneKind = checkZoneKind;
function checkSignalKinds(zone, kinds) {
    return !zone.signals.some((_signal) => _signal.kind === undefined || !kinds.includes(_signal.kind));
}
exports.checkSignalKinds = checkSignalKinds;
function unlink(zone, isOnZoneLevel, signalIndex, axis) {
    if (isOnZoneLevel !== undefined && axis !== undefined) {
        if (isOnZoneLevel === true) {
            delete zone[axis].diaIDs;
            delete zone[axis].nbAtoms;
        }
        else if (typeof signalIndex === 'number' &&
            signalIndex !== -1 &&
            zone.signals[signalIndex]) {
            delete zone.signals[signalIndex][axis].diaIDs;
            delete zone.signals[signalIndex][axis].nbAtoms;
        }
        setNbAtoms(zone, axis);
    }
    else if (axis !== undefined) {
        resetDiaIDs(zone, axis);
        setNbAtoms(zone, axis);
    }
    else {
        ['x', 'y'].forEach((key) => {
            resetDiaIDs(zone, key);
            setNbAtoms(zone, key);
        });
    }
    return zone;
}
exports.unlink = unlink;
function unlinkInAssignmentData(assignmentData, zones, axis) {
    const ids = zones.reduce((acc, zone) => {
        if (zone.id) {
            acc.push(zone.id);
        }
        if (zone.signals) {
            acc = acc.concat(zone.signals.map((signal) => signal.id, []));
        }
        return acc;
    }, []);
    if (axis) {
        assignmentData.dispatch({
            type: 'REMOVE_ALL',
            payload: { id: ids, axis },
        });
    }
    else {
        assignmentData.dispatch({
            type: 'REMOVE_ALL',
            payload: { id: ids, axis: 'x' },
        });
        assignmentData.dispatch({
            type: 'REMOVE_ALL',
            payload: { id: ids, axis: 'y' },
        });
    }
}
exports.unlinkInAssignmentData = unlinkInAssignmentData;
