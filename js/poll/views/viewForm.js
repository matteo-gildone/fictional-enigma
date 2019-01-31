import { tags } from "../../html/index.js";

const { div, form } = tags;

const submitForm = (state, onSubmitMiddleware = []) => e => {
  console.log(onSubmitMiddleware);
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

  onSubmitMiddleware.forEach(middleware => middleware(state));
};

const viewForm = (state, children = [], onSubmitMiddleware = []) => {
  return div({
    class: `c-survey ${state.data.shuffle ? "c-survey--shuffled" : ""}`
  })([
    form({ id: "survey-form", submit: submitForm(state, onSubmitMiddleware) })(
      children.map(child => child(state))
    )
  ]);
};

export { viewForm };
