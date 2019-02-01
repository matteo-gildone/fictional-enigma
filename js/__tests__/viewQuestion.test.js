import "jest-dom/extend-expect";
import { viewQuestion } from "../poll/views/viewQuestion";

test("should render the question markup", () => {
  const actual = viewQuestion({ question: "Poll question" });
  const expected = "Poll question";
  expect(actual).toHaveClass("c-survey__question");
  expect(actual).toHaveTextContent(expected);
  expect(actual.tagName).toEqual("P");
});
