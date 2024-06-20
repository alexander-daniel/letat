function createStore(createState = () => null) {
  let state;
  const listeners = new Set();

  const setState = (partial, replace) => {
    // If the partial state is a function, call it with the current state.
    // Otherwise, use the partial state as-is.
    // This allows us to use the same syntax for both objects and functions.
    const nextState = typeof partial === "function" ? partial(state) : partial;

    // If the nextState is the same as the current state, do nothing.
    if (Object.is(nextState, state)) return;

    //  Save the previous state.
    const previousState = state;

    // Replace the state if replace is true or if the nextState is not an object
    // since we cannot Object.assign() to a non-object.
    state = (replace != null ? replace : typeof nextState !== "object")
      ? nextState
      : Object.assign({}, state, nextState);

    // Notify all listeners of the state change.
    listeners.forEach((listener) => listener(state, previousState));
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const api = { getState, setState, subscribe };
  state = createState(setState, getState, api);

  return api;
}

module.exports = createStore;
