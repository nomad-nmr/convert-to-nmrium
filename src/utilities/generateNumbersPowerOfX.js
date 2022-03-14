"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateNumbersPowerOfX(start, end, options) {
    const { power = 2, format = formatNumber } = options || {};
    let values = [];
    for (let i = start; i <= end; i++) {
        const result = power ** i;
        values.push({
            key: result,
            label: format(result),
            value: result,
        });
    }
    return values;
}
exports.default = generateNumbersPowerOfX;
function formatNumber(number) {
    if (number >= 1024 * 1024) {
        return `${number / (1024 * 1024)}M`;
    }
    else if (number >= 1024) {
        return `${number / 1024}K`;
    }
    else {
        return number;
    }
}
