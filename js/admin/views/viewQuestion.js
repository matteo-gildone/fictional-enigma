import { tags } from "../../html/index.js";
import { viewHelperInput } from "./viewHelperInput";
const { div, fieldset } = tags;

const viewQuestion = () => {
  return fieldset({ class: "form-group" })([
    div({ class: "row" })([
      viewHelperInput("question", "text", "Question"),
      viewHelperInput(
        "options",
        "text",
        "Options",
        "",
        "Insert your options comma separated, eg 'News, Research Analysis, Book & Culture'"
      )
    ])
  ]);
};

export { viewQuestion };
