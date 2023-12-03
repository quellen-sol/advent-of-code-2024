"use strict";
function minBy(arr, fn) {
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
//# sourceMappingURL=minBy.js.map