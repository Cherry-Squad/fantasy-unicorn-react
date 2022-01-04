import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createWrappedApiInterceptor } from "@api/helpers";

import app from "./app";
import auth from "./auth";
import users from "./users";
import contests from "./contests";

const store = (() => {
  const reducer = combineReducers({
    app,
    auth,
    users,
    contests,
  });

  const store = configureStore({ reducer });

  createWrappedApiInterceptor(store);

  return store;
})();

export default store;
