import { noop, shuffle, slugify } from "../utils.js";
import { tags } from "../html/index.js";

import { viewTitle } from "./views/viewTitle.js";
import { viewQuestion } from "./views/viewQuestion.js";
import { viewSubmitButton } from "./views/viewSubmitButton.js";
import { viewForm } from "./views/viewForm.js";

import { storeVote } from "./middlewares/storeVote.js";

const { div, label, input, a, span, p, li, ul } = tags;

const sendEventToGa = state => {
  console.log("- ====== -");
  // window.ga("send", "event", {
  //   eventCategory: state.data.vote,
  //   eventAction: state.data.id,
  //   eventLabel: state.data.doi + ":" + state.data.articleType,
  //   hitCallback: function() {
  //     console.log(
  //       "%c user voted: " + elements.join(", "),
  //       "color: blue; font-weight: bold;"
  //     );
  //   }
  // });
  console.log("- ====== -");
};

const closePoll = state => {
  Polls.close();
};
const isPollVoted = function(doi) {
  const votes = JSON.parse(localStorage.getItem("mago-polls")) || [];
  return votes.indexOf(doi) > -1 ? true : false;
};

const limitCharacters = function(e) {
  var max_chars = 60;
  if (e.target.value.length > max_chars) {
    e.target.value = e.target.value.substr(0, max_chars);
  }
};

const checkClosestRadio = function(e) {
  const parent = e.target.closest(".c-survey__options-container");
  parent.querySelector("#opt-more").checked = true;
};

const focusClosestInputText = function(e) {
  const parent = e.target.closest(".c-survey__options-container");
  if (e.target.checked && e.target.id === "opt-more") {
    parent.querySelector("#opt-more-text").focus();
  } else {
    parent.querySelector("#opt-more-text").value = "";
  }
};

const viewMoreOption = function(state) {
  return li({ class: "c-survey__item c-survey__checkbox" })([
    input({
      id: `opt-more`,
      type: state.data.multiple ? "checkbox" : "radio",
      name: "option",
      value: "opt-more",
      change: focusClosestInputText
    })(),
    label({
      id: `opt-more-label`,
      for: `opt-more`
    })([
      input({
        id: `opt-more-text`,
        type: "text",
        name: `opt-more-text`,
        keypress: limitCharacters,
        focus: checkClosestRadio
      })()
    ])
  ]);
};

const viewOptions = function(state) {
  const optionList = state.data.options.map(function(option) {
    return li({ class: "c-survey__item c-survey__checkbox" })([
      input({
        id: "opt-" + slugify(option),
        type: state.data.multiple ? "checkbox" : "radio",
        name: "option",
        value: option,
        change: state.data.moreOption ? focusClosestInputText : noop
      })(),
      label({ for: "opt-" + slugify(option) })({ text: option })
    ]);
  });
  if (state.data.moreOption) {
    optionList.push(viewMoreOption(state));
  }
  return ul({ class: "c-survey__options-container u-clean-list" })(optionList);
};

const viewFeedBack = function() {
  return div({ class: "c-survey" })([
    div({ class: "c-survey__feedback" })([
      viewTitle({
        data: {
          title: "Thanks for your answer, we value your contribution."
        }
      }),
      p()([
        span()({
          text:
            "If you would like to help us continue to improve, we encourage you to "
        }),
        a({
          href:
            "https://sndigital.springernature.com/usertesting/#how-to-participate",
          rel: "noreferrer noopener",
          target: "_blank"
        })({ text: "sign up to our user panel." })
      ])
    ])
  ]);
};

const renderSurvey = container => state => {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    if (!state.data.vote) {
      container.appendChild(
        viewForm(
          state,
          [viewTitle, viewQuestion, viewOptions, viewSubmitButton],
          [storeVote, sendEventToGa, closePoll]
        )
      );
    } else {
      container.appendChild(viewFeedBack());
    }
  }
};

const state = {};

const Polls = options => {
  const defaultSettings = {
    data: {
      shuffle: false,
      multiple: false,
      moreOption: false
    }
  };
  const settings = Object.assign({}, defaultSettings, options);
  const container = document.getElementById(settings.data.id);
  return {
    create() {
      if (settings.data.shuffle) {
        const shuffled = shuffle(settings.data.options);
        state.data = Object.assign({}, settings.data, {
          options: shuffled
        });
      } else {
        state.data = Object.assign({}, settings.data);
      }
      renderSurvey(container)(state);
    },
    close() {
      renderSurvey(container)(state);
    }
  };
};

Polls({
  data: {
    vote: isPollVoted("123456"),
    doi: "123456",
    articleType: "News",
    id: "poll-123456",
    shuffle: true,
    title: "Thanks for your answer, we value your contribution.",
    question: "How would you describe the article you just read?",
    moreOption: true,
    options: "News, Research Analysis, Book & Culture".split(", "),
    thankYouMessageTitle: "Thanks for your answer, we value your contribution.",
    thankYouMessageText:
      "If you would like to help us continue to improve, we encourage you to:",
    thankYouCtaText: "Sign up to our user panel.",
    thankYouCtaLink:
      "https://sndigital.springernature.com/usertesting/#how-to-participate"
  }
}).create();

export { Polls };
