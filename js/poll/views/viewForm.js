import { tags } from "../../html/index.js";
import { submitForm } from "../handlers.js";

const { div, form } = tags;

const viewForm = (state, dispatch, children = []) => {
  if (
    state.questions &&
    state.questions.length > 0 &&
    typeof dispatch === "function"
  ) {
    return div({
      class: "c-survey"
    })([
      form({ id: "survey-form", submit: submitForm(dispatch) })(
        children.map(child => child(state, dispatch))
      )
    ]);
  } else {
    return div({
      class: "c-survey"
    })({ text: "No questions added." });
  }
};

export { viewForm };
