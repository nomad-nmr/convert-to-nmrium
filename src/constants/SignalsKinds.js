"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatumKind = exports.SignalKindsToInclude = exports.SignalKinds = void 0;
exports.SignalKinds = [
    {
        key: 'signal',
        label: 'Signal',
        value: 'signal',
    },
    {
        key: 'reference',
        label: 'Reference',
        value: 'reference',
    },
    {
        key: 'solvent',
        label: 'Solvent',
        value: 'solvent',
    },
    {
        key: 'impurity',
        label: 'Impurity',
        value: 'impurity',
    },
    {
        key: 'standard',
        label: 'Standard',
        value: 'standard',
    },
    {
        key: 'p1',
        label: 'P1',
        value: 'p1',
    },
    {
        key: 'p2',
        label: 'P2',
        value: 'p2',
    },
    {
        key: 'p3',
        label: 'P3',
        value: 'p3',
    },
];
exports.SignalKindsToInclude = ['signal'];
exports.DatumKind = { signal: 'signal', mixed: 'mixed' };
