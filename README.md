Certainly! Here's an example README file for the `createStore` module:

# l'état

`letat` (l'état, or state) is a simple utility that allows you to create a basic state management system.
It shamelessly steals form zustand/vanilla and simplifies it. No typescript, no middleware, no devtools out of the box.

it's ~700B minified which is what I needed for an embedded JS project.

## Installation

```shell
npm install letat
```

## Usage

```javascript
const createStore = require("letat");

// Create a store with an initial state
const store = createStore();

// Get the current state
const currentState = store.getState();

// Set the state
store.setState({ count: 1 });

// Subscribe to state changes
const unsubscribe = store.subscribe((newState, prevState) => {
  // Handle state change
});

// Unsubscribe from state changes
unsubscribe();
```

## API

### createStore(createState)

Creates a new store instance.

- `createState` (optional): A function that can be used to initialize the state. It receives `setState`, `getState`, and the store `api` as arguments.

#### Returns

An object with the following methods:

- `getState(): any`: Returns the current state.

- `setState(partial: object | function, replace: boolean)`: Sets the state. `partial` can be either an object or a function that receives the current state and returns a new state. If `replace` is `true` or `partial` is not an object, the state is replaced completely.

- `subscribe(listener: function): function`: Subscribes to state changes. The `listener` function is called whenever the state changes. Returns an unsubscribe function that can be used to remove the listener.

## Examples

### Custom `createState` Function

```javascript
const customCreateState = (setState, getState, api) => {
  const initialState = { count: 0 };
  setState(initialState);
};

const store = createStore(customCreateState);
const currentState = store.getState(); // { count: 0 }
```

### Using a Function as Partial State

```javascript
const store = createStore();

const increment = (state) => ({ count: state.count + 1 });
store.setState(increment);

const currentState = store.getState(); // { count: 1 }
```

### Subscribing to State Changes

```javascript
const store = createStore();
store.setState({ count: 1 });

const unsubscribe = store.subscribe((newState, prevState) => {
  console.log("State changed:", newState);
});

store.setState({ count: 2 }); // Listener callback will be invoked

unsubscribe(); // Unsubscribe from state changes
```

## License

This module is licensed under the MIT License
