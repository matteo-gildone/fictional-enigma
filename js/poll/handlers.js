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

export const registerVote = state => {
  const votes = JSON.parse(localStorage.getItem("mago-polls")) || [];
  votes.push(state.doi);
  localStorage.setItem("mago-polls", JSON.stringify(votes));
};

export const sendEventToGa = (state, cb) => {
  if (window.ga && typeof window.ga === "function") {
    window.ga("send", "event", {
      eventCategory: state.vote,
      eventAction: state.id,
      eventLabel: state.doi + ":" + state.articleType,
      hitCallback: cb
    });
  }
};

export const isPollVoted = doi => {
  const votes = JSON.parse(localStorage.getItem("mago-polls")) || [];
  return votes.indexOf(doi) > -1 ? true : false;
};

export const limitCharacters = e => {
  var max_chars = 60;
  if (e.target.value.length > max_chars) {
    e.target.value = e.target.value.substr(0, max_chars);
  }
};
