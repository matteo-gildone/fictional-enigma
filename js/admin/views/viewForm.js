import { tags } from "../../html/index.js";
import { viewHelperInput } from "./viewHelperInput";
import { viewQuestion } from "./viewQuestion";
const { div, h4, form, fieldset, hr } = tags;

const viewForm = () => {
  return div()([
    h4({ class: "mb-3" })({ text: "Polls Creation Tool" }),
    form({ class: "needs-validation mb-4", novalidate: "novalidate" })([
      fieldset({ class: "form-group" })([
        div({ class: "row" })([viewHelperInput("title", "text", "Title")])
      ]),
      hr()(),
      viewQuestion(),
      hr()(),
      fieldset({ class: "form-group" })([
        div({ class: "row" })([
          viewHelperInput(
            "doi",
            "text",
            "Thank you message Cta text (Optional)"
          ),
          viewHelperInput(
            "tidtle",
            "text",
            "Thank you message Cta Link (Optional)"
          )
        ])
      ]),
      hr()()
    ])
  ]);
};
export { viewForm };
