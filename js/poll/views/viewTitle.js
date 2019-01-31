import { tags } from "../../html/index.js";

const { h1 } = tags;
const viewTitle = state => {
  return h1({ class: "c-survey__title" })({
    text: state.data.title
  });
};

export { viewTitle };
