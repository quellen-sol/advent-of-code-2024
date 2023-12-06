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