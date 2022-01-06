// Import React component
import App from './client/components/App';

// Import loadState to read from the browser's local storage
import { loadState } from './client/state/localStorage';

// Import React and Redux
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Import the initial state for first time load
import AppReducer, { initialState } from './client/state/AppReducer';

// Configuring Redux Store
const configureStore = () => {
  // Getting state from local storage - browser's storage
	let persistedState = loadState();
    if (!persistedState) {
        persistedState = initialState;
    }
    const store = createStore(AppReducer, persistedState);
	return store;
};

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('resume-app')
);
