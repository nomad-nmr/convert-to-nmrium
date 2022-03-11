"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeIntegralsRelative = void 0;
function changeIntegralsRelative(datum, newIntegral) {
    const index = datum.integrals.values.findIndex((integral) => integral.id === newIntegral.id);
    if (index !== -1) {
        const ratio = datum.integrals.values[index].absolute / newIntegral.value;
        const { values, sum } = datum.integrals.values.reduce((acc, integral, index) => {
            const newIntegralValue = integral.absolute / ratio;
            acc.sum += newIntegralValue;
            acc.values[index] = {
                ...integral,
                integral: newIntegralValue,
            };
            return acc;
        }, { values: [], sum: 0 });
        datum.integrals.values = values;
        datum.integrals.options = {
            ...datum.integrals.options,
            mf: undefined,
            moleculeKey: undefined,
            sumAuto: false,
            sum,
        };
    }
}
exports.changeIntegralsRelative = changeIntegralsRelative;
