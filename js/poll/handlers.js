export const submitForm = dispatch => e => {
  e.preventDefault();
  const elements =
    e.target && e.target.elements
      ? Array.prototype.slice.call(e.target.elements)
      : [];

  elements.reduce(
    (element, next) =>
      next.nodeName === "INPUT" &&
      (next.checked || next.type === "text") &&
      next.value
        ? element.concat(next.value)
        : element,
    []
  );

  if (elements.length > 0) {
    dispatch({
      type: "VOTE",
      payload: { vote: elements.join(", ") }
    });
  }
};
