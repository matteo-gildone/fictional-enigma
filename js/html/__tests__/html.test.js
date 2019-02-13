import "jest-dom/extend-expect";

import { tags } from "../index";

const { h1, div } = tags;

test("should be a function", () => {
  const actual = typeof h1;
  const expected = "function";
  expect(actual).toEqual(expected);
});

test("should return a function", () => {
  const actual = typeof h1();
  const expected = "function";
  expect(actual).toEqual(expected);
});

test("should return an object", () => {
  const actual = typeof h1()();
  const expected = "object";
  expect(actual).toEqual(expected);
});

test("should be an h1", () => {
  const actual = h1({
    id: "test"
  })();
  const expected = "h1".toUpperCase();
  expect(actual.tagName).toEqual(expected);
});

test("should have the expected id", () => {
  const actual = h1({
    id: "test"
  })();
  const expected = "test";
  expect(actual.id).toEqual(expected);
});

test("should attach event", () => {
  const fakeHandler = jest.fn();
  const actual = h1({
    click: fakeHandler
  })();
  actual.click();
  expect(fakeHandler).toBeCalled();
});

test("should have the expected html class", () => {
  const actual = h1({
    class: "test"
  })();
  const expected = "test";
  expect(actual).toHaveClass(expected);
});

test("should have the expected data attributes", () => {
  const actual = h1({
    "data-test": "test",
    "data-test2": "test2"
  })();
  expect(actual.dataset.test).toEqual("test");
  expect(actual.dataset.test2).toEqual("test2");
});

test("should have the expected text rendered", () => {
  const actual = h1()({
    text: "Test!"
  });
  const expected = "Test!";
  expect(actual).toHaveTextContent(expected);
});

test("should render children", () => {
  const html = div()([
    h1()({
      text: "Test!"
    })
  ]);
  document.body.appendChild(html);
  const ancestor = document.body.querySelector("div");
  const descendant = document.body.querySelector("h1");
  const nonExistantElement = document.body.querySelector(
    '[data-testid="does-not-exist"]'
  );

  expect(ancestor).toContainElement(descendant);
  expect(descendant).not.toContainElement(ancestor);
  expect(ancestor).not.toContainElement(nonExistantElement);
});
