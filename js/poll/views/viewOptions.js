import { tags } from "../../html/index.js";
import { limitCharacters } from "../handlers.js";
import { slugify, noop } from "../../utils.js";
const { label, input, li, ul } = tags;

const checkClosestRadio = e => {
  const parent = e.target.closest(".c-survey__options-container");
  parent.querySelector("#opt-more").checked = true;
};

const focusClosestInputText = e => {
  const parent = e.target.closest(".c-survey__options-container");
  if (e.target.checked && e.target.id === "opt-more") {
    parent.querySelector("#opt-more-text").focus();
  } else {
    parent.querySelector("#opt-more-text").value = "";
  }
};

const viewMoreOption = state => {
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

const viewOptions = state => {
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

export { viewOptions };
