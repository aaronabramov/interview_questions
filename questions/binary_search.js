// given a sorted array of numbers, find a position of a given number or return -1 if not found

test("binary search", () => {
  expect(search([1, 2, 3, 4], 4)).toBe(3);
  expect(search([1, 2, 3, 4, 5], 3)).toBe(2);
  expect(search([1, 2, 3, 4], 9)).toBe(-1);
  expect(search([1, 2, 3, 4], -1)).toBe(-1);
  expect(search([1, 2, 3, 4], 1000)).toBe(-1);
});

const search = (haystack, needle) => {
  let left = 0;
  let right = haystack.length - 1;

  for (;;) {
    if (haystack[left] === needle) {
      return left;
    }

    const middle_index = right - Math.floor((right - left) / 2);

    if (middle_index === left) {
      return -1;
    }

    const middle_value = haystack[middle_index];

    if (middle_value > needle) {
      if (middle_index === right) {
        return -1;
      }
      right = middle_index;
    } else {
      left = middle_index;
    }
  }
};
