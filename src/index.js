import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/container";
import { fetchConfig } from "./configuration";
import { Provider } from "react-redux";
import store from "./store";

fetchConfig().then((config) => {
  if (config) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector("#root")
    );
  }
});
