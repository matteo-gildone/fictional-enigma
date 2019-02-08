import "jest-dom/extend-expect";
import { viewFeedback } from "../views/viewFeedback";

test("should render the Feedback page", () => {
  const feedback = viewFeedback({
    vote: true,
    doi: "123456",
    articleType: "News",
    id: "poll-123456",
    shuffle: false,
    title: "Thanks for your answer, we value your contribution.",
    question: "How would you describe the article you just read?",
    moreOption: false,
    options: "News, Research Analysis, Book & Culture".split(", "),
    thankYouMessageTitle: "Thanks for your answer, we value your contribution.",
    thankYouMessageText:
      "If you would like to help us continue to improve, we encourage you to:",
    thankYouCtaText: "Sign up to our user panel.",
    thankYouCtaLink:
      "https://sndigital.springernature.com/usertesting/#how-to-participate"
  }).querySelector(".c-survey__feedback");

  expect(feedback).toHaveClass("c-survey__feedback");
  expect(feedback.querySelector(".c-survey__title")).toHaveTextContent(
    "Thanks for your answer, we value your contribution."
  );
  expect(feedback.querySelector("p")).toHaveTextContent(
    "If you would like to help us continue to improve, we encourage you to:"
  );
});
