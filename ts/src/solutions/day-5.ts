import { Solution } from "../definitions";
import { chunks, minBy } from "../utils/utils";

type ItemMap = [dest: number, src: number, len: number];

export class Day5Solution extends Solution {
  constructor() {
    super("./src/solutions/day-5-input.txt");
  }
  part1Solution() {
    // const splitAll = this.input.split("\n\n");
    const splitAll = `seeds: 1 10 20 15

fml:
60 50 10
100 100 50

fallthrough-catch:
69 2 10`.split("\n\n");
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
    // const splitAll = this.input.split("\n\n");
    const splitAll = `seeds: 1 10 20 15

fml:
60 50 10
100 100 50

fallthrough-catch:
69 2 10`.split("\n\n");
    const [seedList, ...rest] = splitAll;
    const seeds = chunks(
      [...seedList.match(/\d+/g)!].map((v) => parseInt(v)),
      2,
    );
    const mapsList = rest.map((v) => this.parseMapList(v));
    // Create a bs range for seeds:
    const bsSeedMap = seeds.map<ItemMap>((s) => [s[0], 0, s[1]]);
    mapsList.unshift(bsSeedMap);
    let res: ItemMap[] | undefined;
    for (let i = mapsList.length - 1; i >= 0; i--) {
      const curr = mapsList[i];
      res ??= curr;
      const oneBack = mapsList[i - 1];
      if (!oneBack) {
        break;
      }
      res = this.getBackwardRangesForMaps(res, oneBack);
    }
    return res ?? [];
  }

  numInRange(num: number, itemMap: ItemMap) {
    return num in itemMap;
  }

  parseMapList(list: string): ItemMap[] {
    return list.split("\n").reduce<ItemMap[]>((acc, c) => {
      const split = c.split(" ");
      if (split.length !== 3) {
        return acc;
      }

      acc.push(split.map((v) => parseInt(v)) as ItemMap);
      return acc;
    }, []);
  }

  getOutputForItemMaps(input: number, itemMaps: ItemMap[]): number {
    let res = input;
    for (const map of itemMaps) {
      const [dest, src, len] = map;
      if (input < src + len && input >= src) {
        return dest + (input - src);
      }
    }
    return res;
  }

  getBackwardRangesForMaps(maps: ItemMap[], others: ItemMap[]): ItemMap[] {
    const res: ItemMap[] = [];
    for (const map of maps) {
      let [this_dst, this_src, this_len] = map;
      for (const other of others) {
        const [other_dst, other_src, other_len] = other;
        const otherMin = other_dst;
        const otherMax = other_dst + other_len;
        const thisMin = this_src;
        const thisMax = this_src + this_len;
        if (otherMax < thisMin || otherMin > thisMax) {
          continue;
        }

        const coveredStart = Math.max(thisMin, otherMin);// Conf
        const coveredEnd = Math.min(thisMax, otherMax); // Conf
        const resultLength = coveredEnd - coveredStart; // Confirmed
        const resultSrc = other_src + (coveredStart - otherMin); // ???
        const resultDest = this.getOutputForItemMaps(coveredStart, [map]); // Confirmed
        res.push([resultDest, resultSrc, resultLength]);
      }
    }

    return res;
  }
}
