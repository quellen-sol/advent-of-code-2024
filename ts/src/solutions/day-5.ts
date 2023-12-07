import { Solution } from "../definitions";
import { chunks, minBy } from "../utils/utils";

type ItemMap = [dest: number, start: number, len: number];

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
    // const splitAll = this.input.split("\n\n");
    const splitAll = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split("\n\n");
    const [seedList, ...rest] = splitAll;
    const seeds = chunks(
      [...seedList.match(/\d+/g)!].map((v) => parseInt(v)),
      2,
    );
    const mapsList = rest.map((v) => this.parseMapList(v));
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
        const [o_dst, o_src, o_len] = other;
        const backMinCovered = o_dst;
        const backMaxCovered = o_dst + o_len;
        const thisMinCovered = this_src;
        const thisMaxCovered = this_src + this_len;
        if (backMaxCovered < thisMinCovered || backMinCovered > thisMaxCovered) {
          continue;
        }
        // ItemMap { dst: , src: , len: }?
        if (backMaxCovered > thisMinCovered) {
        }
      }
    }

    return res;
  }
}
