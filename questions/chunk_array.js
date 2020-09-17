// Given an array and a number N, chunk the array into N chunks
// e.g
// INPUT: [1, 2, 3, 4, 5, 6], 3
// OUTPUT: [[1, 2], [3, 4], [5, 6]]

const makeArray = (n) =>
  new Array(n).fill(0).map(() => Math.floor(Math.random() * 100000));

const ARR_LEN = 100000;
const CHUNKS = 1000;

const arr = makeArray(ARR_LEN);

// Splice is a O(n) function inside a loop which makes total complexity quadratic
function chunk(arr, size = 1) {
  const result = [];
  const len = arr.length;

  for (let i = 0; i < size; i++) {
    result.push(arr.splice(0, Math.ceil(len / size)));
  }

  return result;
}

// This function will copy elemenets, which is much faster and runs in O(n)
// although it has some memory overhead
function chunkByCopying(array, size = 1) {
  const result = [[]];
  const perChunk = Math.ceil(array.length / size);

  for (let i = 0; i < array.length; i++) {
    let currentChunk = result[result.length - 1];
    if (currentChunk.length === perChunk) {
      currentChunk = [];
      result.push(currentChunk);
    }

    currentChunk.push(array[i]);
  }

  return result;
}

for (const [name, fn] of [
  ["chunk", chunk],
  ["chunk by copying", chunkByCopying],
]) {
  test(`split array in chunks using "${name}"`, () => {
    const result = fn(makeArray(ARR_LEN), CHUNKS);

    expect(result.length).toEqual(CHUNKS);
  });
}
