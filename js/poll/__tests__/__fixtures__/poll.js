export default (
  container,
  moreOption = false,
  shuffle = false,
  voted = false,
  multiple = false
) => ({
  container: container,
  data: {
    vote: voted,
    doi: "123456",
    articleType: "News",
    id: "poll-123456",
    questions: [
      {
        text: "How would you describe the article you just read?",
        options: "News, Research Analysis, Book & Culture".split(", "),
        type: "single",
        shuffle: shuffle,
        moreOption: moreOption,
        multiple: multiple
      }
    ],
    title: "Thanks for your answer, we value your contribution.",
    thankYouMessageTitle: "Thanks for your answer, we value your contribution.",
    thankYouMessageText:
      "If you would like to help us continue to improve, we encourage you to:",
    thankYouCtaText: "Sign up to our user panel.",
    thankYouCtaLink:
      "https://sndigital.springernature.com/usertesting/#how-to-participate"
  }
});
