"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = exports.CURRENT_EXPORT_VERSION = void 0;
const migrateToVersion1_1 = __importDefault(require("./migrateToVersion1"));
const migrateToVersion2_1 = __importDefault(require("./migrateToVersion2"));
exports.CURRENT_EXPORT_VERSION = 2;
function migrationPipe(functions) {
    return (input) => functions.reduce((input, func) => func(input), input);
}
function migrate(data) {
    let migrationsFuncs = [
        migrateToVersion1_1.default,
        migrateToVersion2_1.default,
    ];
    let index = data?.version || 0;
    return migrationPipe(migrationsFuncs.slice(index))(data);
}
exports.migrate = migrate;
