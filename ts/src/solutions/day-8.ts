import { Solution } from "../definitions";

type PointMap = {
  [addr: string]: {
    L: string;
    R: string;
  };
};

export class Day8Solution extends Solution {
  constructor() {
    super("./src/solutions/day-8-input.txt");
  }
  part1Solution() {
    const [instructions, _, ...points] = this.lines;
    const pointMap = this.makePointMap(points);
    return this.walkThroughInstructions(instructions, pointMap);
  }
  part2Solution() {
    const [instructions, _, ...points] = this.lines;
    const pointMap = this.makePointMap(points);
    const startingPoints = Object.keys(pointMap).filter(p => p[p.length - 1] === "A");
    return this.walkThroughMultiStartingPoints(instructions, pointMap, startingPoints);
  }

  walkThroughMultiStartingPoints(instructions: string, pointMap: PointMap, startingPoints: string[]): number {
    const ixs = instructions.split("");
    let steps = 0;
    let currentPoints = startingPoints;
    let index = -1;
    while (!currentPoints.every((p) => p[p.length - 1] === "Z")) {
      index = (index + 1) % ixs.length;
      currentPoints = currentPoints.map((curr) => {
        const point = pointMap[curr];
        const ix = ixs[index];
        return point[ix as keyof PointMap[string]];
      });
      steps++;
    }

    return steps;
  }

  walkThroughInstructions(instructions: string, pointMap: PointMap): number {
    const ixs = instructions.split("");
    let currentPoint = "AAA";
    let steps = 0;
    let index = -1;
    while (currentPoint !== "ZZZ") {
      const point = pointMap[currentPoint];
      index = (index + 1) % ixs.length;
      const ix = ixs[index];
      currentPoint = point[ix as keyof PointMap[string]];
      steps++;
    }

    return steps;
  }

  makePointMap(points: string[]): PointMap {
    return points.reduce<PointMap>((acc, p) => {
      const [addr, left, right] = p.match(/\w+/g)!;
      acc[addr] = {
        L: left,
        R: right,
      };
      return acc;
    }, {})
  }
}
