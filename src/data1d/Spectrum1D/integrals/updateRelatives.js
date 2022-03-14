"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRelatives = void 0;
const getSum_1 = require("../../../utilities/getSum");
function updateRelatives(data, key, check, forceCalculateIntegral = false) {
    const { values, options } = data;
    const currentSum = (0, getSum_1.getSum)(values, 'absolute', check);
    let factor = 0;
    if (options.sum) {
        if (data.options.isSumConstant || forceCalculateIntegral) {
            factor = currentSum > 0 ? options.sum / currentSum : 0.0;
        }
        else {
            if (data.values?.[0]) {
                const item = data.values[0];
                factor =
                    (item[key] ? item[key] : options.sum) /
                        item.absolute;
            }
        }
    }
    data.values = data.values.map((value) => {
        return {
            ...value,
            ...(check(value) && {
                [key]: value.absolute * factor,
            }),
        };
    });
    if (!data.options.isSumConstant && !forceCalculateIntegral) {
        data.options.sum = (0, getSum_1.getSum)(data.values, key, check);
    }
}
exports.updateRelatives = updateRelatives;
