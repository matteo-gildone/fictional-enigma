export default (...middlewareFactories) => createStore => (...args) => {
  const store = createStore(...args);
  let dispatch = store.dispatch;
  middlewareFactories.forEach(factory => {
    dispatch = factory(store)(dispatch);
  });
  store.dispatch = dispatch;
  return store;
};
