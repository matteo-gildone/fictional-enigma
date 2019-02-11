export default (registerVote, sendEventToGa) => (state = {}, action) => {
  let newState;
  switch (action.type) {
    case "INIT":
      newState = Object.assign({}, state, action.payload);
      return newState;
    case "VOTE":
      newState = Object.assign({}, state, action.payload);
      sendEventToGa(newState);
      registerVote(newState);
      return newState;
    default:
      return state;
  }
};
