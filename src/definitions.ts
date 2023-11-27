export abstract class Solution {
  abstract part1Solution(): any;
  abstract part2Solution(): any;

  logPart1Solution() {
    console.log("Part 1 Solution: ", this.part1Solution());
  }

  logPart2Solution() {
    console.log("Part 2 Solution: ", this.part2Solution());
  }
}
