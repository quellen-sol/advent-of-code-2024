"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day3Solution = void 0;
const definitions_1 = require("../definitions");
class Day3Solution extends definitions_1.Solution {
    constructor() {
        super("./src/solutions/day-3-input.txt");
    }
    getFullPartNumber(x, y, graph) {
        let xStart = x;
        let xEnd = x;
        const xCoords = [x];
        // Search left for all numbers until . or x = 0
        for (let i = x - 1; i >= 0; i--) {
            const item = graph[y][i];
            if (!this.isNumber(item)) {
                break;
            }
            xCoords.push(i);
            xStart = i;
        }
        // Search right until hitting the end
        for (let i = x + 1; i < graph[y].length; i++) {
            const item = graph[y][i];
            if (!this.isNumber(item)) {
                break;
            }
            xCoords.push(i);
            xEnd = i;
        }
        // Grab the entire number
        const digits = [];
        for (let i = xStart; i <= xEnd; i++) {
            digits.push(graph[y][i]);
        }
        xCoords.sort();
        return { value: parseInt(digits.join("")), xCoords };
    }
    makeGraph() {
        const graph = this.lines.map((line) => line.trim().split(""));
        return graph;
    }
    searchAroundPoint(x, y, graph, predicate) {
        var _a;
        const searchVals = [-1, 0, 1];
        const validVals = [];
        for (const ySearch of searchVals) {
            for (const xSearch of searchVals) {
                const item = (_a = graph[y + ySearch]) === null || _a === void 0 ? void 0 : _a[x + xSearch];
                if (!item || (ySearch === y && xSearch === x)) {
                    continue;
                }
                if (predicate(item)) {
                    validVals.push({
                        value: item,
                        xCoord: xSearch,
                        yCoord: ySearch,
                    });
                }
            }
        }
        return validVals;
    }
    isNumber(symbol) {
        return /\d/.test(symbol);
    }
    isSymbol(symbol) {
        return /[^\d.]/.test(symbol);
    }
    part1Solution() {
        const predicate = (item) => this.isSymbol(item);
        const graph = this.makeGraph();
        const partNums = [];
        for (let y = 0; y < graph.length; y++) {
            const graphLine = graph[y];
            for (let x = 0; x < graphLine.length; x++) {
                const item = graphLine[x];
                if (!this.isNumber(item)) {
                    continue;
                }
                const { value: partNum, xCoords } = this.getFullPartNumber(x, y, graph);
                if (partNum === 868) {
                    console.log("Hitting 868");
                }
                let valueIsPartNumber = false;
                for (let xSearch = xCoords[0]; xSearch <= xCoords[xCoords.length - 1]; xSearch++) {
                    const searchResult = this.searchAroundPoint(xSearch, y, graph, predicate);
                    if (searchResult.length > 0) {
                        valueIsPartNumber = true;
                        break;
                    }
                }
                if (valueIsPartNumber) {
                    partNums.push(partNum);
                }
                // Advance search to the end of the number
                x = xCoords[xCoords.length - 1];
            }
        }
        const result = partNums.reduce((a, c) => a + c, 0);
        return result;
    }
    part2Solution() { }
}
exports.Day3Solution = Day3Solution;
//# sourceMappingURL=day-3.js.map