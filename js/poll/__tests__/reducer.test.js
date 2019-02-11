import "jest-dom/extend-expect";

import reducer from "../reducer";

const fakeRegisterVote = jest.fn();
const fakeSendToGa = jest.fn();

test("should return the uchanged state if action type doesn't exists", () => {
  const state = {};
  const action = {
    type: "TEST",
    payload: { testKey: "testValue" }
  };
  const newState = reducer(fakeRegisterVote, fakeSendToGa)(state, action);
  expect(newState).toEqual({});
});

test("should return the correct updated state", () => {
  const state = {};
  const action = {
    type: "INIT",
    payload: { testKey: "testValue" }
  };
  const newState = reducer(fakeRegisterVote, fakeSendToGa)(state, action);
  expect(newState).toEqual({ testKey: "testValue" });
});

test("should call action functions", () => {
  const state = {};
  const action = {
    type: "VOTE",
    payload: { vote: true }
  };
  const newState = reducer(fakeRegisterVote, fakeSendToGa)(state, action);
  expect(newState).toEqual({ vote: true });
  expect(fakeRegisterVote).toBeCalled();
  expect(fakeSendToGa).toBeCalled();
});
