import { tags } from "../../html/index.js";

const { div, form } = tags;

const submitForm = (state, dispatch) => e => {
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

  dispatch({
    type: "VOTE",
    payload: { vote: elements.join(", ") }
  });
};

const viewForm = (state, dispatch, children = []) => {
  return div({
    class: `c-survey ${state.shuffle ? "c-survey--shuffled" : ""}`
  })([
    form({ id: "survey-form", submit: submitForm(state, dispatch) })(
      children.map(child => child(state, dispatch))
    )
  ]);
};

export { viewForm };
