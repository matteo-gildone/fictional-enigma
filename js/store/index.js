export default function createStore(reducer, initialState = {}, enhancer) {
  if (typeof initialState === "function" && typeof enhancer === "undefined") {
    enhancer = initialState;
    initialState = undefined;
  }
  const store = {};
  let state = initialState;
  const listeners = [];
  store.getState = () => state;
  store.dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener(store));
  };
  store.subscribe = listener => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };
  return store;
}
