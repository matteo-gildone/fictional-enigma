import { tags } from "../../html/index.js";
const { div, label, input } = tags;

//type_ t, placeholder p, value v, onInput toMsg
const viewHelperInput = (
  id = "",
  type = "text",
  labelText = "",
  value = "",
  onChange = () => {}
) => {
  return div({ class: "col-md-12 mb-3" })([
    label({ for: id })({ text: labelText }),
    input({
      type: type,
      class: "form-control",
      id: id,
      value: value,
      change: onChange
    })()
  ]);
};

export { viewHelperInput };
