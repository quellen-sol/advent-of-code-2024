"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day1Solution = void 0;
const definitions_1 = require("../definitions");
class Day1Solution extends definitions_1.Solution {
    constructor() {
        super("./src/solutions/day-1-input.txt");
        this.digitMap = {
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
        };
    }
    getFirstAndLast(arr, map) {
        if (arr.length === 0) {
            throw new Error("Array is empty");
        }
        const first = arr[0];
        const last = arr[arr.length - 1];
        const firstVal = map ? map[first] : first;
        const lastVal = map ? map[last] : last;
        return firstVal + lastVal;
    }
    part1Solution() {
        const result = this.input
            .split("\n")
            .map((line) => line.split(/[A-z]*/).filter((v) => v !== ""))
            .map((numArr) => {
            const firstLast = this.getFirstAndLast(numArr);
            const num = parseInt(firstLast);
            return num;
        })
            .reduce((acc, curr) => acc + curr, 0);
        return result;
    }
    part2Solution() {
        const lines = this.input.split("\n");
        const values = [];
        for (const line of lines) {
            const foundValues = [];
            for (let i = 0; i < line.length; i++) {
                for (const value in this.digitMap) {
                    const slice = line.slice(i, i + value.length);
                    if (slice === value) {
                        foundValues.push(value);
                    }
                }
            }
            const firstLast = this.getFirstAndLast(foundValues, this.digitMap);
            const num = parseInt(firstLast);
            values.push(num);
        }
        return values.reduce((acc, curr) => acc + curr, 0);
    }
}
exports.Day1Solution = Day1Solution;
//# sourceMappingURL=day-1.js.map