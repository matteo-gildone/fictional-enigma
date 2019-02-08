import "jest-dom/extend-expect";
import { viewSubmitButton } from "../views/viewSubmitButton";

test("should render the question markup", () => {
  const actual = viewSubmitButton();
  expect(actual).toHaveClass("c-survey__submit");
  expect(actual).toHaveTextContent("Confirm");
  expect(actual.tagName).toEqual("BUTTON");
  expect(actual).toHaveAttribute("type", "submit");
});
