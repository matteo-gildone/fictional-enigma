export const submitForm = dispatch => e => {
  e.preventDefault();
  const elements = Array.prototype.slice
    .call(e.target.elements)
    .reduce(
      (element, next) =>
        next.nodeName === "INPUT" &&
        (next.checked || next.type === "text") &&
        next.value
          ? element.concat(next.value)
          : element,
      []
    );

  dispatch({
    type: "VOTE",
    payload: { vote: elements.join(", ") }
  });
};
