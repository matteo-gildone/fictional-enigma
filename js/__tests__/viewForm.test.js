import "jest-dom/extend-expect";
import dataLayerFixture from "./__fixtures__/dataLayer";
import { viewForm } from "../poll/views/viewForm";
import { tags } from "../html";

const { button } = tags;

const event = { preventDefault: () => {} };

beforeEach(() => {
  window.ga = jest.fn().mockImplementation(() => jest.fn());
  window.dataLayer = dataLayerFixture;
  jest.spyOn(event, "preventDefault");
});

test("should render the form markup", () => {
  const actual = viewForm({ data: {} });
  expect(actual).toHaveClass("c-survey");
  expect(actual.querySelector("form").tagName).toEqual("FORM");
});

test("Should render a regular poll", () => {
  const actual = viewForm({ data: { shuffle: false } }, [], []);
  expect(actual).toHaveClass("c-survey");
  expect(actual).not.toHaveClass("c-survey--shuffled");
});

test("Should render a shuffled poll", () => {
  const actual = viewForm({ data: { shuffle: true } }, [], []);
  expect(actual).toHaveClass("c-survey");
  expect(actual).toHaveClass("c-survey--shuffled");
});

test("Should call middlewares on submit", () => {
  const fn1Mock = jest.fn();
  const fn2Mock = jest.fn();
  const btn = () =>
    button({ class: "c-survey__submit", type: "submit" })({
      text: "Confirm"
    });
  const actual = viewForm(
    { data: { shuffle: true } },
    [btn],
    [fn1Mock, fn2Mock]
  );
  actual.querySelector(".c-survey__submit").click();
  expect(fn1Mock).toBeCalled();
});
