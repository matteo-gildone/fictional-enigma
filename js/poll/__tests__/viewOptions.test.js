import "jest-dom/extend-expect";
import poll from "./__fixtures__/poll";
import { viewOptions } from "../views/viewOptions";

test("should not render the more option fields", () => {
  const actual = viewOptions(
    poll("poll-12345", false, false, false).data.questions[0]
  );
  expect([...actual.querySelectorAll("li")].length).toEqual(3);
});

test("should render checkbox instead of radio input", () => {
  const actual = viewOptions(
    poll("poll-12345", false, false, false, true).data.questions[0]
  );
  expect([...actual.querySelectorAll('[type="checkbox"]')].length).toEqual(3);
});

test("should render the more option fields", () => {
  const actual = viewOptions(
    poll("poll-12345", true, false, false).data.questions[0]
  );
  expect([...actual.querySelectorAll("li")].length).toEqual(4);
});

test("should render checkbox instead of radio input", () => {
  const actual = viewOptions(
    poll("poll-12345", true, false, false, true).data.questions[0]
  );
  expect([...actual.querySelectorAll('[type="checkbox"]')].length).toEqual(4);
});

test("should check when focus on input text more option fields", () => {
  const options = viewOptions(
    poll("poll-12345", true, false, false).data.questions[0]
  );
  const moreOption = options.querySelector("#opt-more");
  const moreText = options.querySelector("#opt-more-text");
  moreText.focus();
  expect(moreOption.checked).toBeTruthy();
});

test("should focus input text when radio is checked", () => {
  const options = viewOptions(
    poll("poll-12345", true, false, false).data.questions[0]
  );
  const moreOption = options.querySelector("#opt-more");
  const moreText = options.querySelector("#opt-more-text");
  moreOption.click();
  moreText.value = "some value";
  expect(moreText === document.activeElement).toBeTruthy();
  expect(moreText.value).toEqual("some value");
});

test("should clean the input text when changed option", () => {
  const options = viewOptions(
    poll("poll-12345", true, false, false).data.questions[0]
  );
  const firstOption = options.querySelector("input");
  const moreOption = options.querySelector("#opt-more");
  const moreText = options.querySelector("#opt-more-text");
  moreOption.click();
  moreText.value = "some value";
  firstOption.click();
  expect(moreText.value).toEqual("");
});
