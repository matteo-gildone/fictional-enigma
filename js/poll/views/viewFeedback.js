import { viewTitle } from "./viewTitle.js";
import { tags } from "../../html/index.js";
const { div, a, span, p } = tags;

const viewFeedback = state => {
  return div({ class: "c-survey" })([
    div({ class: "c-survey__feedback" })([
      viewTitle({
        title: state.thankYouMessageTitle
      }),
      p()([
        span()({
          text: state.thankYouMessageText
        }),
        a({
          href: state.thankYouCtaLink,
          rel: "noreferrer noopener",
          target: "_blank"
        })({ text: state.thankYouCtaText })
      ])
    ])
  ]);
};

export { viewFeedback };
