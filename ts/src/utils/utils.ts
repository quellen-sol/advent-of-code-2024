export function minBy<T>(arr: T[], fn: (v: T) => number) {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  let min = Infinity;
  for (const v of arr) {
    const curr = fn(v);
    if (curr < min) {
      min = curr;
    }
  }

  return min;
}

export function chunks<T>(arr: T[], chunkSize: number): T[][] {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    res.push(arr.slice(i, i + chunkSize));
  }
  return res;
}

export function arrayCount<T>(arr: T[], val: T): number {
  return arr.filter((v) => v === val).length;
}

export function arrayCountByCallback<T>(arr: T[], fn: (v: T, idx: number, a: typeof arr) => boolean): number {
  return arr.filter(fn).length;
}

export type ArrayCountsWithElements<T> = {
  count: number;
  elements: { value: T; idx: number }[];
};

export function arrayCountByWithElements<T>(
  arr: T[],
  fn: (v: T, idx: number, a: typeof arr) => boolean,
): ArrayCountsWithElements<T> {
  const elements: { value: T; idx: number }[] = [];
  const count = arr.filter((v, idx, a) => {
    if (fn(v, idx, a)) {
      elements.push({ value: v, idx });
      return true;
    }
    return false;
  }).length;
  return { count, elements };
}

export function leastCommonMultiple(...nums: number[]): number {
  const max = Math.max(...nums);
  let curr = max;
  while (true) {
    if (nums.every((n) => curr % n === 0)) {
      return curr;
    }
    curr += max;
  }
}
