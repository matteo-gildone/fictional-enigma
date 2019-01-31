import { tags } from "../../html/index.js";

const { p } = tags;
const viewQuestion = state => {
  return p({ class: "c-survey__question" })({
    text: state.data.question
  });
};

export { viewQuestion };
