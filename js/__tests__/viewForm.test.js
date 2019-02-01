import "jest-dom/extend-expect";
import dataLayerFixture from "./__fixtures__/dataLayer";
import { viewForm } from "../poll/views/viewForm";
const mockDispatch = jest.fn();
beforeEach(() => {
  window.ga = jest.fn().mockImplementation(() => jest.fn());
  window.dataLayer = dataLayerFixture;
});

test("should render the form markup", () => {
  const actual = viewForm(
    {
      vote: false,
      doi: "123456",
      articleType: "News",
      id: "poll-123456",
      shuffle: true,
      title: "Thanks for your answer, we value your contribution.",
      question: "How would you describe the article you just read?",
      moreOption: false,
      options: "News, Research Analysis, Book & Culture".split(", "),
      thankYouMessageTitle:
        "Thanks for your answer, we value your contribution.",
      thankYouMessageText:
        "If you would like to help us continue to improve, we encourage you to:",
      thankYouCtaText: "Sign up to our user panel.",
      thankYouCtaLink:
        "https://sndigital.springernature.com/usertesting/#how-to-participate"
    },
    mockDispatch,
    []
  );
  expect(actual).toHaveClass("c-survey");
  expect(actual.querySelector("form").tagName).toEqual("FORM");
});

test("Should render a regular poll", () => {
  const actual = viewForm(
    {
      vote: false,
      doi: "123456",
      articleType: "News",
      id: "poll-123456",
      shuffle: false,
      title: "Thanks for your answer, we value your contribution.",
      question: "How would you describe the article you just read?",
      moreOption: false,
      options: "News, Research Analysis, Book & Culture".split(", "),
      thankYouMessageTitle:
        "Thanks for your answer, we value your contribution.",
      thankYouMessageText:
        "If you would like to help us continue to improve, we encourage you to:",
      thankYouCtaText: "Sign up to our user panel.",
      thankYouCtaLink:
        "https://sndigital.springernature.com/usertesting/#how-to-participate"
    },
    mockDispatch,
    []
  );
  expect(actual).toHaveClass("c-survey");
  expect(actual).not.toHaveClass("c-survey--shuffled");
});

test("Should render a shuffled poll", () => {
  const actual = viewForm(
    {
      vote: false,
      doi: "123456",
      articleType: "News",
      id: "poll-123456",
      shuffle: true,
      title: "Thanks for your answer, we value your contribution.",
      question: "How would you describe the article you just read?",
      moreOption: false,
      options: "News, Research Analysis, Book & Culture".split(", "),
      thankYouMessageTitle:
        "Thanks for your answer, we value your contribution.",
      thankYouMessageText:
        "If you would like to help us continue to improve, we encourage you to:",
      thankYouCtaText: "Sign up to our user panel.",
      thankYouCtaLink:
        "https://sndigital.springernature.com/usertesting/#how-to-participate"
    },
    mockDispatch,
    []
  );
  expect(actual).toHaveClass("c-survey");
  expect(actual).toHaveClass("c-survey--shuffled");
});

// test("Should call middlewares on submit", () => {
//   const fn1Mock = jest.fn();
//   const fn2Mock = jest.fn();
//   const btn = () =>
//     button({ class: "c-survey__submit", type: "submit" })({
//       text: "Confirm"
//     });
//   const actual = viewForm(
//     { data: { shuffle: true } },
//     [btn],
//     [fn1Mock, fn2Mock]
//   );
//   actual.querySelector(".c-survey__submit").click();
//   expect(fn1Mock).toBeCalled();
// });
