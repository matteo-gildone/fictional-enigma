import { tags } from "../../html/index.js";
import { viewOptions } from "./viewOptions.js";

const { div, p } = tags;
const viewQuestion = state => {
  const { questions } = state;
  const result = questions.map(question => {
    return div({ class: `${question.shuffle ? "c-survey--shuffled" : ""}` })([
      p({ class: "c-survey__question" })({
        text: question.text
      }),
      viewOptions(question)
    ]);
  });
  return div()(result);
};

export { viewQuestion };
