import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

import { createStore } from "redux";

function playlist(state = [], action) {

  if (action.type === "ADD_TRACK") {
    return [...state, action.payload];
  }
  if (action.type === "DELETE_TRACK") {
    state.splice(action.payload, 1);
    return [...state];
  }

  return [...state];
}

const store = createStore(playlist);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
