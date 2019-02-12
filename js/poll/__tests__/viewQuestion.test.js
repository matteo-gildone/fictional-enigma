import "jest-dom/extend-expect";
import { viewQuestion } from "../views/viewQuestion";

test("should render the question markup", () => {
  const actual = viewQuestion({
    questions: [
      {
        text: "How would you describe the article you just read?",
        options: "News, Research Analysis, Book & Culture".split(", "),
        type: "single",
        shuffle: true,
        moreOption: true
      }
    ]
  }).querySelector("p");
  const expected = "How would you describe the article you just read?";
  expect(actual).toHaveClass("c-survey__question");
  expect(actual).toHaveTextContent(expected);
  expect(actual.tagName).toEqual("P");
});

test("Should render a regular poll", () => {
  const actual = viewQuestion({
    questions: [
      {
        text: "How would you describe the article you just read?",
        options: "News, Research Analysis, Book & Culture".split(", "),
        type: "single",
        shuffle: false,
        moreOption: true
      }
    ]
  }).querySelector("div");
  expect(actual).not.toHaveClass("c-survey--shuffled");
});

test("Should render a shuffled poll", () => {
  const actual = viewQuestion({
    questions: [
      {
        text: "How would you describe the article you just read?",
        options: "News, Research Analysis, Book & Culture".split(", "),
        type: "single",
        shuffle: true,
        moreOption: true
      }
    ]
  }).querySelector("div");
  expect(actual).toHaveClass("c-survey--shuffled");
});
