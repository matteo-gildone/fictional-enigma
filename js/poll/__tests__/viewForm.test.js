import "jest-dom/extend-expect";
import dataLayerFixture from "./__fixtures__/dataLayer";
import poll from "./__fixtures__/poll";
import { tags } from "../../html";
import { viewForm } from "../views/viewForm";

const { div } = tags;
const mockDispatch = jest.fn();
beforeEach(() => {
  window.ga = jest.fn().mockImplementation(() => jest.fn());
  window.dataLayer = dataLayerFixture;
});

test("should render the form markup", () => {
  const actual = viewForm(
    poll("poll-12345", false, false, false).data,
    mockDispatch,
    []
  );
  expect(actual).toHaveClass("c-survey");
  expect(actual.querySelector("form").tagName).toEqual("FORM");
});

test("Should be empty", () => {
  const actual = viewForm(
    poll("poll-12345", false, true, false).data,
    mockDispatch,
    []
  );
  expect(actual.querySelector("form")).toBeEmpty();
});

test("Should handle the lack of questions.", () => {
  const actual = viewForm({}, mockDispatch, []);
  expect(actual).toHaveTextContent("No questions added.");
});

test("Should add children", () => {
  const actual = viewForm(
    poll("poll-12345", false, true, false).data,
    mockDispatch,
    [
      (state, dispatch) =>
        div({ class: "child-element" })({ text: "I'm your child" })
    ]
  );
  expect(actual.querySelector("div")).toHaveClass("child-element");
  expect(actual).toHaveTextContent("I'm your child");
});
