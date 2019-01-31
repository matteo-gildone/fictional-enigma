import { tags } from "../../html";

const { h1 } = tags;
const viewTitle = function(state) {
  return h1({ class: "c-survey__title" })({
    text: state.data.title
  });
};

export { viewTitle };
