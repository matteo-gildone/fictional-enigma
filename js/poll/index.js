import { noop, shuffle, slugify } from "../utils";
import { tags } from "../html";

import { viewTitle } from "./views/viewTitle";

const { div, label, input, a, span, form, p, li, ul, button } = tags;

const registerVote = function(state) {
  const votes = JSON.parse(localStorage.getItem("mago-polls")) || [];
  votes.push(state.data.doi);
  localStorage.setItem("mago-polls", JSON.stringify(votes));
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

const onChange = (objToWatch, onChangeFunction) => {
  const handler = {
    set(target, property, value) {
      Reflect.set(target, property, value);
      onChangeFunction(target);
      return true;
    }
  };
  return new Proxy(objToWatch, handler);
};

const submitForm = state => e => {
  e.preventDefault();
  const elements = Array.prototype.slice
    .call(e.target.elements)
    .reduce(
      (element, next) =>
        next.nodeName === "INPUT" &&
        (next.checked || next.type === "text") &&
        next.value
          ? element.concat(next.value)
          : element,
      []
    );

  state.data = Object.assign({}, state.data, {
    vote: elements.join(", ")
  });

  registerVote(state);
  console.log("- ====== -");
  if (window.dataLayer && typeof window.dataLayer !== "undefined") {
    window.ga("send", "event", {
      eventCategory: elements.join(", "),
      eventAction: state.data.id,
      eventLabel: state.data.doi + ":" + state.data.articleType,
      hitCallback: () => {
        console.log(
          "%c user voted: " + elements.join(", "),
          "color: blue; font-weight: bold;"
        );
      }
    });
  }
  console.log("- ====== -");
};

const viewQuestion = function(state) {
  return p({ class: "c-survey__question" })({
    text: state.data.question
  });
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

const viewSubmitButton = function(state) {
  return button({ class: "c-survey__submit", type: "submit" })({
    text: "Confirm"
  });
};

const viewSurvey = function(state) {
  return div({
    class: `c-survey ${state.data.shuffle ? "c-survey--shuffled" : ""}`
  })([
    form({ id: "survey-form", submit: submitForm(state) })([
      viewTitle(state),
      viewQuestion(state),
      viewOptions(state),
      viewSubmitButton(state)
    ])
  ]);
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
      container.appendChild(viewSurvey(state));
      state.data.height = container.offsetHeight + "px";
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
  const container =
    typeof settings.container === "string"
      ? document.getElementById(settings.container)
      : settings.container;

  const state = onChange({}, renderSurvey(container));
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
    }
  };
};
export { Polls };
