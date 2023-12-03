import { Solution } from "../definitions";

type PartsGraph = string[][];

type Location = {
  value: string;
  xCoord: number;
  yCoord: number;
};

export class Day3Solution extends Solution {
  constructor() {
    super("./src/solutions/day-3-input.txt");
  }

  getFullPartNumber(x: number, y: number, graph: PartsGraph) {
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
    for (let i = x + 1; i < graph[y].length ?? 0; i++) {
      const item = graph[y][i];
      if (!this.isNumber(item)) {
        break;
      }
      xCoords.push(i);
      xEnd = i;
    }

    // Grab the entire number
    const digits: string[] = [];
    for (let i = xStart; i <= xEnd; i++) {
      digits.push(graph[y][i]);
    }

    xCoords.sort((a, b) => a - b);

    return { value: parseInt(digits.join("")), xCoords };
  }

  makeGraph(): PartsGraph {
    const graph: PartsGraph = this.lines.map((line) => line.trim().split(""));
    return graph;
  }

  searchAroundPoint(
    x: number,
    y: number,
    graph: PartsGraph,
    predicate: (item: string) => boolean,
    breakAfterFirst = false,
  ): Location[] {
    const searchVals = [-1, 0, 1];
    const validVals: Location[] = [];
    for (const ySearch of searchVals) {
      for (const xSearch of searchVals) {
        const px = x + xSearch;
        const py = y + ySearch;
        const item = graph[py]?.[px];
        if (!item || (ySearch === y && xSearch === x)) {
          continue;
        }
        if (predicate(item)) {
          validVals.push({
            value: item,
            xCoord: px,
            yCoord: py,
          });
          if (breakAfterFirst) {
            break;
          }
        }
      }
    }
    return validVals;
  }

  isNumber(symbol: string) {
    return /\d/.test(symbol);
  }

  isSymbol(symbol: string) {
    return /[^\d.]/.test(symbol);
  }

  part1Solution() {
    const predicate = (item: string) => this.isSymbol(item);

    const graph = this.makeGraph();
    const partNums: number[] = [];
    for (let y = 0; y < graph.length; y++) {
      const graphLine = graph[y];
      for (let x = 0; x < graphLine.length; x++) {
        const item = graphLine[x];
        if (!this.isNumber(item)) {
          continue;
        }
        const { value: partNum, xCoords } = this.getFullPartNumber(x, y, graph);
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

  part2Solution() {
    const graph = this.makeGraph();
    const ratios: number[] = [];
    for (let y = 0; y < graph.length; y++) {
      const graphLine = graph[y];
      for (let x = 0; x < graphLine.length; x++) {
        const item = graphLine[x];
        if (item !== "*") {
          continue;
        }
        const locations = this.searchAroundPoint(x, y, graph, (item) => this.isNumber(item));
        const partNumsForGear: number[] = [];
        const locationsSearched: { [yCoord: string]: Set<number> } = {};
        for (const location of locations) {
          const { xCoord, yCoord } = location;
          const { value: partNum, xCoords: xCoordsSearched } = this.getFullPartNumber(xCoord, yCoord, graph);
          // Ensure we're not getting duplicate part nums
          const locSearched = locationsSearched[yCoord];
          if (locSearched && locSearched.has(xCoord)) {
            continue;
          } else if (!locSearched) {
            locationsSearched[yCoord] = new Set(xCoordsSearched);
          }
          partNumsForGear.push(partNum);
        }
        if (partNumsForGear.length !== 2) {
          continue;
        }
        const ratio = partNumsForGear[0] * partNumsForGear[1];
        ratios.push(ratio);
      }
    }
    return ratios.reduce((a, c) => a + c, 0);
  }
}
