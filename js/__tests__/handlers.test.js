import "jest-dom/extend-expect";
import { submitForm, registerVote } from "../poll/handlers";

const dispatch = jest.fn();

test("should call prevent default", () => {
  const event = { preventDefault: jest.fn() };
  submitForm(dispatch)(event);
  expect(event.preventDefault).toBeCalled();
});

test("should call dispatch", () => {
  const event = {
    preventDefault: jest.fn(),
    target: { elements: ["aaaa", "bbbb"] }
  };
  submitForm(dispatch)(event);
  expect(dispatch).toBeCalled();
});

test("should local storage should be called", () => {
  const state = {
    doi: "randomdoi"
  };
  
  registerVote(state);
  expect(localStorage.getItem).toBeCalled();
  expect(localStorage.getItem).toHaveBeenLastCalledWith("mago-polls");
  expect(localStorage.setItem).toBeCalled();
  expect(localStorage.setItem).toHaveBeenLastCalledWith(
    "mago-polls",
    "[\"randomdoi\"]"
  );
  expect(localStorage.getItem).toHaveBeenLastCalledWith("mago-polls");
});
