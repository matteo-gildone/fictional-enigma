import { shuffle } from "../utils.js";

import createStore from "../store/index.js";
import applyMiddleware from "../store/applyMiddleware.js";
import { viewTitle } from "./views/viewTitle.js";
import { viewQuestion } from "./views/viewQuestion.js";
import { viewSubmitButton } from "./views/viewSubmitButton.js";
import { viewForm } from "./views/viewForm.js";
import { viewFeedback } from "./views/viewFeedback.js";
import reducer from "./reducer.js";
import { registerVote, sendEventToGa, isPollVoted } from "./handlers.js";

const logger = store => dispatch => action => {
  console.group(action.type);
  console.info("previous", store.getState());
  let result = dispatch(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const render = container => store => {
  if (container) {
    const { getState, dispatch } = store;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    if (!getState().vote) {
      container.appendChild(
        viewForm(getState(), dispatch, [
          viewTitle,
          viewQuestion,
          viewSubmitButton
        ])
      );
    } else {
      container.appendChild(viewFeedback(getState()));
    }
  }
};
const Polls = options => {
  const defaultSettings = {
    data: {}
  };
  const settings = Object.assign({}, defaultSettings, options);
  const container = document.getElementById(settings.data.id);
  return {
    create() {
      const store = applyMiddleware(logger)(createStore)(
        reducer(registerVote, sendEventToGa)
      );

      store.subscribe(render(container));
      if (settings.data.shuffle) {
        settings.data.options = shuffle(settings.data.options);
      }
      store.dispatch({
        type: "INIT",
        payload: settings.data
      });
    }
  };
};

window.pollsList.polls.forEach(poll => {
  poll.data.vote = isPollVoted(poll.data.doi);
  Polls(poll).create();
});

export { Polls };
