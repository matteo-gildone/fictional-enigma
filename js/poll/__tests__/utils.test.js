import { noop, shuffle, slugify } from "../../utils.js";

test("Should return undefined", () => {
  expect(noop()).toEqual(undefined);
});

test("Should convert & into  and", () => {
  const actual = slugify("Book & Culture");
  const expected = "book-and-culture";
  expect(actual).toEqual(expected);
});

test("Should ignore special characters", () => {
  const actual = slugify("Book & Culture! My string, yay.");
  const expected = "book-and-culture-my-string-yay";
  expect(actual).toEqual(expected);
});

test("Should ignore special characters", () => {
  const actual = shuffle([1, 2, 3, 4, 5]);
  const expected = 5;
  expect(actual.length).toEqual(expected);
});
