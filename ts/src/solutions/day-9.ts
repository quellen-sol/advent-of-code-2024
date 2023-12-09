import { Solution } from "../definitions";

type History = number[];

export class Day9Solution extends Solution {
  constructor() {
    super("./src/solutions/day-9-input.txt");
  }
  part1Solution() {
    const histories = this.lines.map<History>((line) => {
      return line.split(" ").map((v) => +v);
    });
    const comparisons = histories.map(this.getAllComparisons);
    return this.getPredictionValueOfComparisons(comparisons);
  }
  part2Solution() {
    const histories = this.lines.map<History>((line) => {
      return line.split(" ").map((v) => +v);
    });
    const comparisons = histories.map(this.getAllComparisons);
    return this.getPreviousValueOfComparisons(comparisons);
  }

  getPredictionValueOfComparisons(comparisons: History[][]): number {
    let result = 0;
    for (const comparison of comparisons) {
      let currCompVal = 0;
      for (let i = comparison.length - 1; i >= 0; i--) {
        const thisHist = comparison[i];
        const lastHistVal = thisHist[thisHist.length - 1] ?? 0;
        currCompVal += lastHistVal;
      }
      result += currCompVal;
    }
    return result;
  }

  getPreviousValueOfComparisons(comparisons: History[][]): number {
    let result = 0;
    for (const comparison of comparisons) {
      let currCompVal = 0;
      for (let i = comparison.length - 1; i >= 0; i--) {
        const thisHist = comparison[i];
        const lastHistVal = thisHist[0] ?? 0;
        currCompVal = lastHistVal - currCompVal;
      }
      result += currCompVal;
    }
    return result;
  }

  getAllComparisons(history: History): History[] {
    const comparisons = [history];
    let currentHistory = history;
    while (!currentHistory.every((v) => v === 0)) {
      const newHist: History = [];
      for (let i = 0; i < currentHistory.length - 1; i++) {
        const currVal = currentHistory[i];
        const oneAhead = currentHistory[i + 1];
        const difference = oneAhead - currVal;
        newHist.push(difference);
      }
      comparisons.push(newHist);
      currentHistory = newHist;
    }
    return comparisons;
  }
}
