import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./reducers/store";

const store = configureStore(window.__PRELOADED_STATE__);

// const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
