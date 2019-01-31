const storeVote = state => {
  const votes = JSON.parse(localStorage.getItem("mago-polls")) || [];
  votes.push(state.data.doi);
  localStorage.setItem("mago-polls", JSON.stringify(votes));
};

export { storeVote };
