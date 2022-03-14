"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MARGIN = exports.DISPLAYER_MODE = exports.DEFAULT_YAXIS_SHIFT_VALUE = void 0;
exports.DEFAULT_YAXIS_SHIFT_VALUE = 20;
var DISPLAYER_MODE;
(function (DISPLAYER_MODE) {
    DISPLAYER_MODE["DM_1D"] = "1D";
    DISPLAYER_MODE["DM_2D"] = "2D";
})(DISPLAYER_MODE = exports.DISPLAYER_MODE || (exports.DISPLAYER_MODE = {}));
exports.MARGIN = {
    '2D': { top: 100, right: 50, bottom: 70, left: 100 },
    '1D': {
        top: 10,
        right: 10,
        bottom: 70,
        left: 10,
    },
};
