import "jest-dom/extend-expect";
import {
  submitForm,
  registerVote,
  isPollVoted,
  sendEventToGa,
  limitCharacters
} from "../handlers";

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
    '["randomdoi"]'
  );
  expect(localStorage.getItem).toHaveBeenLastCalledWith("mago-polls");
});

test("should return true if the poll is already voted", () => {
  expect(localStorage.getItem).toHaveBeenLastCalledWith("mago-polls");
  expect(isPollVoted("randomdoi")).toBeTruthy();
});

test("should return false if the poll is already voted", () => {
  expect(localStorage.getItem).toHaveBeenLastCalledWith("mago-polls");
  expect(isPollVoted("randomdoi2")).not.toBeTruthy();
});

test("should call ga", () => {
  window.ga = jest.fn();
  const mockCb = jest.fn();
  const fakeState = {
    id: "poll-123456",
    doi: "randomdoi",
    vote: "News",
    articleType: "Books and Culture"
  };
  sendEventToGa(fakeState, mockCb);
  expect(window.ga).toHaveBeenCalled();
  expect(window.ga).toHaveBeenCalledWith("send", "event", {
    eventAction: "poll-123456",
    eventCategory: "News",
    eventLabel: "randomdoi:Books and Culture",
    hitCallback: mockCb
  });
});

test("should not a string shorter than 60 characters", () => {
  const fakeEvent = {
    target: {
      value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  };

  limitCharacters(fakeEvent);

  expect(fakeEvent.target.value).toEqual(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
});

test("should trim a string longer than 60 characters", () => {
  const fakeEvent = {
    target: {
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae venenatis neque."
    }
  };

  limitCharacters(fakeEvent);

  expect(fakeEvent.target.value).toEqual(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pro"
  );
});
