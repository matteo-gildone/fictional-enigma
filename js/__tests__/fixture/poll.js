export default (container, voted, shuffle, moreOption) => ({
  container: container,
  data: {
    vote: voted,
    doi: "123456",
    articleType: "News",
    id: "poll-123456",
    shuffle: shuffle,
    title: "Thanks for your answer, we value your contribution.",
    question: "How would you describe the article you just read?",
    moreOption: moreOption,
    options: "News, Research Analysis, Book & Culture".split(", "),
    thankYouMessageTitle: "Thanks for your answer, we value your contribution.",
    thankYouMessageText:
      "If you would like to help us continue to improve, we encourage you to:",
    thankYouCtaText: "Sign up to our user panel.",
    thankYouCtaLink:
      "https://sndigital.springernature.com/usertesting/#how-to-participate"
  }
});
