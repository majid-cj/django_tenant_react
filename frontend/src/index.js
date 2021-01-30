import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import reducers from "./reducers";
import { Navigation } from "./navigations";

const App = () => {
  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <Navigation />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
