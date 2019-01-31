import tagsList from "./tags";
import Element from "./element";

const tags = tagsList.reduce((acc, next) => {
  acc[next] = Element(next);
  return acc;
}, {});

export { tags };
