import "jest-dom/extend-expect";
import { viewTitle } from "../views/viewTitle";

test("should render the title markup", () => {
  const actual = viewTitle({ title: "Test title!" });
  const expected = "Test title!";
  expect(actual).toHaveClass("c-survey__title");
  expect(actual).toHaveTextContent(expected);
  expect(actual.tagName).toEqual("H1");
});
