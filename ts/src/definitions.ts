import { readFileSync } from "fs";

export abstract class Solution {
  input: string;
  lines: string[];
  constructor(inputFileName: string) {
    const input = readFileSync(inputFileName, "utf-8");
    this.input = input;
    this.lines = input.split("\n");
  }

  abstract part1Solution(): any;
  abstract part2Solution(): any;

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
