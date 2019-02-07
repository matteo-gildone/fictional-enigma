import { noop, shuffle, slugify } from "../utils.js";
import { tags } from "../html/index.js";

import createStore from "../store/index.js";
import applyMiddleware from "../store/applyMiddleware.js";
import { viewTitle } from "./views/viewTitle.js";
import { viewQuestion } from "./views/viewQuestion.js";
import { viewSubmitButton } from "./views/viewSubmitButton.js";
import { viewForm } from "./views/viewForm.js";

const logger = store => dispatch => action => {
  console.group(action.type);
  console.info("previous", store.getState());
  let result = dispatch(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT":
      return Object.assign({}, state, action.payload);
    case "VOTE":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

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
      type: state.multiple ? "checkbox" : "radio",
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
  const optionList = state.options.map(function(option) {
    return li({ class: "c-survey__item c-survey__checkbox" })([
      input({
        id: "opt-" + slugify(option),
        type: state.multiple ? "checkbox" : "radio",
        name: "option",
        value: option,
        change: state.moreOption ? focusClosestInputText : noop
      })(),
      label({ for: "opt-" + slugify(option) })({ text: option })
    ]);
  });
  if (state.moreOption) {
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

const render = container => store => {
  if (container) {
    const { getState, dispatch } = store;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    if (!getState().vote) {
      container.appendChild(
        viewForm(getState(), dispatch, [
          viewTitle,
          viewQuestion,
          viewOptions,
          viewSubmitButton
        ])
      );
    } else {
      container.appendChild(viewFeedBack());
    }
  }
};
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
      const store = applyMiddleware(logger)(createStore)(reducer);

      store.subscribe(render(container));
      if (settings.data.shuffle) {
        settings.data.options = shuffle(settings.data.options);
      }
      store.dispatch({
        type: "INIT",
        payload: settings.data
      });
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
