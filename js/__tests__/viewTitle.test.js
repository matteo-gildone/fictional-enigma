import "jest-dom/extend-expect";

import { tags } from "../html";

const { h1 } = tags;

{
  /* <h1 class="c-survey__title">Help us to improve our browsing experience</h1> */
}

test("should render the title markup", () => {
  const actual = h1({ class: "c-survey__title" })({
    text: "Test!"
  });
  const expected = "Help us to improve our browsing experience";
  expect(actual).toHaveTextContent(expected);
});
