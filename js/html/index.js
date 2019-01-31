import tagsList from "./tags.js";
import Element from "./element.js";

const tags = tagsList.reduce((acc, next) => {
  acc[next] = Element(next);
  return acc;
}, {});

export { tags };
