"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solution = void 0;
const fs_1 = require("fs");
class Solution {
    constructor(inputFileName) {
        const input = (0, fs_1.readFileSync)(inputFileName, "utf-8");
        this.input = input;
        this.lines = input.split("\n");
    }
    logPart1Solution() {
        console.time("Part 1 Solution");
        const solution = this.part1Solution();
        console.timeEnd("Part 1 Solution");
        console.log("Part 1 Solution: ", solution);
    }
    logPart2Solution() {
        console.time("Part 2 Solution");
        const solution = this.part2Solution();
        console.timeEnd("Part 2 Solution");
        console.log("Part 2 Solution: ", solution);
    }
    logBothSolutions() {
        this.logPart1Solution();
        this.logPart2Solution();
    }
}
exports.Solution = Solution;
//# sourceMappingURL=definitions.js.map