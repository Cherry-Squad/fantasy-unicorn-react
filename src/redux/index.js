import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createWrappedApiInterceptor } from "@api/helpers";

import app from "./app";
import auth from "./auth";
import users from "./users";

const store = (() => {
  const reducer = combineReducers({
    app,
    auth,
    users,
  });

  const store = configureStore({ reducer });

  createWrappedApiInterceptor(store);

  return store;
})();

export default store;
