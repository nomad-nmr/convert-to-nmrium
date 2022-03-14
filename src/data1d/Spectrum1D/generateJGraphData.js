"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateID_1 = __importDefault(require("../../utilities/generateID"));
function generateJGraphData(ranges, jGraphTolerance) {
    if (!ranges && !Array.isArray(ranges))
        return null;
    let signals = [];
    let jCouplingMax = 0;
    let links = createLinks(ranges, jGraphTolerance);
    for (const range of ranges) {
        for (const signal of range.signals) {
            const { id: signalId, ...restSignal } = signal;
            if (restSignal.js) {
                signals.push({ id: `${range.id}${signalId}`, ...restSignal });
                const tempMax = getJsCouplingMax(restSignal.js);
                jCouplingMax = tempMax > jCouplingMax ? tempMax : jCouplingMax;
            }
        }
    }
    return { signals, jCouplingMax, links };
}
exports.default = generateJGraphData;
function getJsCouplingMax(js) {
    let max = -Infinity;
    for (const { coupling } of js) {
        max = coupling > max ? coupling : max;
    }
    return max;
}
function getCouplings(ranges) {
    const couplings = [];
    for (let range of ranges) {
        for (const { delta, js } of range.signals) {
            for (const { coupling } of js || []) {
                couplings.push({ coupling, delta });
            }
        }
    }
    return couplings;
}
function initLink(coupling) {
    const { delta } = coupling;
    return {
        id: (0, generateID_1.default)(),
        from: delta,
        to: delta,
        couplings: [coupling],
    };
}
function createLinks(ranges, jGraphTolerance = 0) {
    const couplings = getCouplings(ranges).sort((a, b) => a.coupling - b.coupling);
    if (!couplings || couplings.length === 0)
        return [];
    const links = [initLink(couplings[0])];
    let index = 0;
    let start = index;
    let end = 1;
    while (end < couplings.length) {
        const nextCoupling = couplings[end];
        if (Math.abs(couplings[start].coupling - nextCoupling.coupling) <
            jGraphTolerance) {
            links[index].couplings.push(nextCoupling);
            if (nextCoupling.delta > links[index].to) {
                links[index].to = nextCoupling.delta;
            }
            else if (nextCoupling.delta < links[index].from) {
                links[index].from = nextCoupling.delta;
            }
            end++;
        }
        else {
            if (Math.abs(couplings[end - 1].coupling - nextCoupling.coupling) <
                jGraphTolerance) {
                start = end - 1;
            }
            else {
                index++;
                links[index] = initLink(couplings[end]);
                start = end;
                end = end + 1;
            }
        }
    }
    return links;
}
