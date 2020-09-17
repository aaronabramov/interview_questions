// Given a huge array of sorted random numbers and a sequence of numbers from 1 to N, find how many
// of those sequence numbers appear in the random array.

const arr = new Array(100000)
  .fill(0)
  .map(() => Math.floor(Math.random() * 100000));
arr.sort((a, b) => a - b);

// clone initial array, to make sure we don't accidentally modify it
const makeArray = () => [...arr];

const toFind = new Array(100).fill(null).map((_, i) => i);

const usingSplice = (arr, toFind) => {
  let found = 0;
  for (const i of toFind) {
    if (arr.findIndex((x) => x === i) >= 0) {
      found += 1;
    }
  }

  return found;
};

const usingBinarySearch = (arr, toFind) => {
  let foundBin = 0;

  for (const i of toFind) {
    let left = 0;
    let right = arr.length - 1;

    for (;;) {
      let middle = left + Math.floor((right - left) / 2);
      let middleValue = arr[middle];

      if (arr[left] === i || middleValue === i) {
        foundBin += 1;
        // console.log("beraking", {i, left, right}, arr[left], )
        break;
      }

      if (middle === left) {
        break;
      }

      if (middleValue < i) {
        left = middle;
      } else {
        right = middle;
      }
    }
  }

  return foundBin;
};

const usingHashMap = (arr, toFind) => {
  const hash = arr.reduce((acc, x, i) => {
    acc[x] = i;
    return acc;
  }, {});

  let foundHash = 0;
  for (const i of toFind) {
    if (hash.hasOwnProperty(i)) {
      foundHash += 1;
    }
  }

  return foundHash;
};

const found = usingHashMap(makeArray(), toFind);

for (const [name, fn] of [
  ["using binary search", usingBinarySearch],
  ["using hashmap", usingHashMap],
  ["using splice", usingSplice],
]) {
  test(`find elements in the array using "${name}"`, () => {
    const result = fn(makeArray(), toFind);
    expect(result).toEqual(found);
  });
}
