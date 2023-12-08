import { Solution } from "../definitions";
import { chunks, minBy } from "../utils/utils";

type MapRange = [dest: number, src: number, len: number];

type CoveredAndUncoveredRanges = {
  covered: MapRange[];
  uncovered: MapRange[];
};

export class Day5Solution extends Solution {
  constructor() {
    super("./src/solutions/day-5-input.txt");
  }
  part1Solution() {
    const splitAll = this.input.split("\n\n");
    const [seedList, ...rest] = splitAll;
    const seeds = [...seedList.match(/\d+/g)!].map((v) => parseInt(v));
    const mapsList = rest.map((v) => this.parseMapList(v));

    const finalLocations = seeds.map((seed) => {
      let location = seed;
      for (const itemMaps of mapsList) {
        location = this.getOutputForItemMaps(location, itemMaps);
      }
      return location;
    });

    return minBy(finalLocations, (v) => v);
  }
  part2Solution() {
    return "I have no idea";
  }

  parseMapList(list: string): MapRange[] {
    return list.split("\n").reduce<MapRange[]>((acc, c) => {
      const split = c.split(" ");
      if (split.length !== 3) {
        return acc;
      }

      acc.push(split.map((v) => parseInt(v)) as MapRange);
      return acc;
    }, []);
  }

  getOutputForItemMaps(input: number, itemMaps: MapRange[]): number {
    let res = input;
    for (const map of itemMaps) {
      const [dest, src, len] = map;
      if (input < src + len && input >= src) {
        return dest + (input - src);
      }
    }
    return res;
  }
}
