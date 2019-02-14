import { tags } from "../../html/index.js";

const { button } = tags;

const viewSubmitButton = () => {
  return button({ class: "c-survey__submit", type: "submit" })({
    text: "Confirm"
  });
};

export { viewSubmitButton };
