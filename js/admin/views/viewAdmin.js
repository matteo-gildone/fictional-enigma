import { tags } from "../../html/index.js";
const { div, h4 } = tags;

import { viewForm } from "./viewForm";

const viewAdmin = () => {
  return div({ class: "container mt-5" })([
    div({ class: "row" })([
      div({ class: "col-md-7" })([viewForm()]),
      div({ class: "col-md-5" })([
        h4({ class: "mb-3" })({ text: "Preview" }),
        div({ id: "poll-preview" })(),
        div({ id: "poll-preview-voted" })()
      ])
    ])
  ]);
};
export { viewAdmin };
