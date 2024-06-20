const createStore = require("./index");

// Test case 1: Initial state should be null
test("Initial state is null", () => {
  const store = createStore();
  expect(store.getState()).toBeNull();
});

// Test case 2: Set and get state
test("Set and get state", () => {
  const store = createStore();
  const newState = { count: 1 };
  store.setState(newState);
  expect(store.getState()).toEqual(newState);
});

// Test case 3: Partial state update
test("Partial state update", () => {
  const store = createStore();
  const initialState = { count: 1, name: "John" };
  store.setState(initialState);

  const partialState = { count: 2 };
  store.setState(partialState);

  const expectedState = { count: 2, name: "John" };
  expect(store.getState()).toEqual(expectedState);
});

// Test case 4: Function as partial state
test("Function as partial state", () => {
  const store = createStore();
  const initialState = { count: 1 };
  store.setState(initialState);

  const increment = (state) => ({ count: state.count + 1 });
  store.setState(increment);

  const expectedState = { count: 2 };
  expect(store.getState()).toEqual(expectedState);
});

// Test case 5: Listener callback
test("Listener callback", () => {
  const store = createStore();
  const initialState = { count: 1 };
  store.setState(initialState);

  const listener = jest.fn();
  store.subscribe(listener);

  const newState = { count: 2 };
  store.setState(newState);

  expect(listener).toHaveBeenCalledTimes(1);
  expect(listener).toHaveBeenCalledWith(newState, initialState);
});

// Test case 6: Unsubscribe listener
test("Unsubscribe listener", () => {
  const store = createStore();
  const initialState = { count: 1 };
  store.setState(initialState);

  const listener = jest.fn();
  const unsubscribe = store.subscribe(listener);

  const newState = { count: 2 };
  store.setState(newState);

  unsubscribe();
  store.setState({ count: 3 });

  expect(listener).toHaveBeenCalledTimes(1);
  expect(listener).toHaveBeenCalledWith(newState, initialState);
});

// Test case 7: Custom createState function
test("Custom createState function", () => {
  const customCreateState = (set, get, api) => {
    const initialState = { count: 10 };
    set(initialState);
    return initialState;
  };

  const store = createStore(customCreateState);
  const expectedState = { count: 10 };
  expect(store.getState()).toEqual(expectedState);
});

// Test case 8: State does not change if nextState is the same
test("State does not change if nextState is the same", () => {
  const store = createStore();
  const initialState = { count: 1 };
  store.setState(initialState);

  const listener = jest.fn();
  store.subscribe(listener);

  // Setting the same state should not trigger a state change or listener callback
  store.setState(store.getState());

  expect(store.getState()).toEqual(initialState);
  expect(listener).not.toHaveBeenCalled();
});

// Test case 9: Replace flag replaces the state
test("Replace flag replaces the state", () => {
  const store = createStore();
  const initialState = { count: 1 };
  store.setState(initialState);

  const newState = { name: "John" };
  store.setState(newState, true);

  expect(store.getState()).toEqual(newState);
});
