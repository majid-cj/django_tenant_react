import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import reducers from "./reducers";
import { Routers } from './routers';

const App = () => {
  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <Routers />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
