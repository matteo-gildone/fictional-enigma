import { tags } from "../../html/index.js";
import { submitForm } from "../handlers.js";

const { div, form } = tags;

const viewForm = (state, dispatch, children = []) => {
  return div({
    class: `c-survey ${state.shuffle ? "c-survey--shuffled" : ""}`
  })([
    form({ id: "survey-form", submit: submitForm(dispatch) })(
      children.map(child => child(state, dispatch))
    )
  ]);
};

export { viewForm };
