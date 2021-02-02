import React from "react";
import ReactDOM from "react-dom";
import App from "./Containers/App/container";
import { Provider } from "react-redux";
import {mainStore as store} from "./state";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
