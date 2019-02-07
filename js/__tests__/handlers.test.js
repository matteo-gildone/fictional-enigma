import "jest-dom/extend-expect";
import { submitForm } from "../poll/handlers";

const dispatch = jest.fn();

test("should call prevent default", () => {
  const event = { preventDefault: jest.fn() };
  submitForm(dispatch)(event);
  expect(event.preventDefault).toBeCalled();
});

test("should call dispatch ", () => {
  const event = {
    preventDefault: jest.fn(),
    target: { elements: ["aaaa", "bbbb"] }
  };
  submitForm(dispatch)(event);
  expect(dispatch).toBeCalled();
});
