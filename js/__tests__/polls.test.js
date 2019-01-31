import "jest-dom/extend-expect";
import { tags } from "../html";
import { Polls } from "../poll";
import pollFixture from "./fixture/poll";
import dataLayerFixture from "./fixture/dataLayer";
const { div } = tags;

function cleanUpBody() {
  const container = document.body;
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
function generatePoll(moreOption = false, shuffle = false, voted = false) {
  const container = div({ id: "poll-123456" })();
  document.body.appendChild(container);
  Polls(pollFixture(container, moreOption, shuffle, voted)).create();
  return container;
}

beforeEach(() => {
  window.ga = jest.fn().mockImplementation(() => jest.fn());
  window.dataLayer = dataLayerFixture;
});

afterEach(() => {
  cleanUpBody();
});

test("Should not be empty", () => {
  generatePoll();
  expect(document.querySelector("#poll-123456")).not.toBeEmpty();
});

test("Should not be empty and match text", () => {
  const expected = "Thanks for your answer, we value your contribution.";
  generatePoll();
  expect(document.querySelector(".c-survey__title")).toHaveTextContent(
    expected
  );
});

test("Should display 'More' option", () => {
  generatePoll(true, false, false);
  const options = [...document.querySelectorAll(".c-survey__item")];
  expect(options.length).toEqual(4);
});

test("Should select 'More' option", () => {
  generatePoll(true, false, false);
  document.querySelector("#opt-more-label").click();
  const checked = document.querySelector("#opt-more").checked;
  expect(checked).toBeTruthy();
});

test("Should display 'Thank you message'", () => {
  generatePoll(false, false, true);
  expect(document.querySelector(".c-survey__title")).toHaveTextContent(
    "Thanks for your answer, we value your contribution."
  );
  expect(
    document.querySelector(".c-survey__feedback p span")
  ).toHaveTextContent(
    "If you would like to help us continue to improve, we encourage you to"
  );
});

test("Should not shuffle options", () => {
  generatePoll(false, false, false);
  const shuffled = [...document.querySelectorAll(".c-survey--shuffled")];
  expect(shuffled.length).toEqual(0);
});

test("Should shuffle options", () => {
  generatePoll(false, true, false);
  const shuffled = [...document.querySelectorAll(".c-survey--shuffled")];
  expect(shuffled.length).toEqual(1);
});

test("Should call ga", () => {
  generatePoll();
  document.querySelector(".c-survey__item label").click();
  document.querySelector(".c-survey__submit").click();
  expect(window.ga).toBeCalled();
  // expect(window.ga).toBeCalledWith("send", "event", {
  //   eventAction: "poll-123456",
  //   eventCategory: "News",
  //   eventLabel: "123456:News",
  //   hitCallback: jest
  //     .fn()
  //     .mockImplementation(() =>
  //       console.log(
  //         "%c user voted: " + elements.join(", "),
  //         "color: blue; font-weight: bold;"
  //       )
  //     )
  // });
});
