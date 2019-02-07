import "jest-dom/extend-expect";
import { submitForm } from "../poll/handlers";

const dispatch = jest.fn();

test("should render the title markup", () => {
  const event = { preventDefault: jest.fn() };
  submitForm(dispatch)(event);
  expect(dispatch).toBeCalled();
  expect(event.preventDefault).toBeCalled();
});
