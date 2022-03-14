"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSpectrumFromPublicationString = void 0;
const nmr_processing_1 = require("nmr-processing");
const generateSpectrumFromRanges_1 = require("./ranges/generateSpectrumFromRanges");
function generateSpectrumFromPublicationString(publicationString, usedColors) {
    const { ranges, experiment: { nucleus, solvent }, parts, } = (0, nmr_processing_1.resurrect)(publicationString);
    return (0, generateSpectrumFromRanges_1.generateSpectrumFromRanges)(ranges, { nucleus, solvent, name: parts[0] }, usedColors);
}
exports.generateSpectrumFromPublicationString = generateSpectrumFromPublicationString;
