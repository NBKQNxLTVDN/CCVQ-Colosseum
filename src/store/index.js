import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "reducers";
import history from "utils/history";

const store = createStore(
  createRootReducer(history),
  compose(applyMiddleware(routerMiddleware(history)))
);

export default store;
