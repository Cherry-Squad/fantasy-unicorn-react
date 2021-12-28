import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { unwrapResult } from "@reduxjs/toolkit";

import { getConfig, isErrorOnParseSelector } from "@redux/conf";
import { getSelf } from "@redux/users";
import { setTokens } from "@redux/auth/actions";
import { logout } from "@redux/auth/slices";
import { loggedInSelector } from "@redux/auth/selectors";
import { tokens } from "@utils";

const appSelector = (state) => state.app;

export const AppStateEnum = Object.freeze({
  OFF: "off",
  INITIALIZING: "initializing",
  RUNNING: "running",
  FAILED: "failed",
});

export const initApplication = createAsyncThunk(
  "app/init",
  async (_, { getState, dispatch, requestId, rejectWithValue }) => {
    const { currentRequestId, loading } = appSelector(getState());
    if (
      loading !== AppStateEnum.INITIALIZING ||
      requestId !== currentRequestId
    ) {
      return;
    }

    dispatch(setTokens(tokens.localStorageLoad()));

    try {
      await dispatch(getConfig()).then(unwrapResult);
      if (isErrorOnParseSelector(getState())) {
        throw new Error("parse error");
      }
    } catch (e) {
      console.log("Config loading error!", e);
      return rejectWithValue(e);
    }

    if (loggedInSelector(getState())) {
      try {
        await dispatch(getSelf()).then(unwrapResult);
      } catch (e) {
        console.error("User load error! Emitting logout...", e);
        if (loggedInSelector(getState())) dispatch(logout());
      }
    }

    return "OK";
  }
);

export const loadingSelector = createSelector(
  appSelector,
  ({ loading }) => loading
);

export const errorSelector = createSelector(appSelector, ({ error }) => error);

export const app = createSlice({
  name: "app",
  initialState: {
    loading: AppStateEnum.OFF,
    initRequestId: null,
    currentRequestId: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [initApplication.pending]: (state, action) => {
      if (state.loading === AppStateEnum.OFF) {
        state.loading = AppStateEnum.INITIALIZING;
        state.currentRequestId = action.meta.requestId;
      }
    },
    [initApplication.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (
        state.loading === AppStateEnum.INITIALIZING &&
        state.currentRequestId === requestId
      ) {
        state.loading = AppStateEnum.RUNNING;
        state.currentRequestId = null;
      }
    },
    [initApplication.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (
        state.loading === AppStateEnum.INITIALIZING &&
        state.currentRequestId === requestId
      ) {
        state.loading = AppStateEnum.FAILED;
        state.currentRequestId = null;
        state.error = action.payload;
      }
    },
  },
});

const reducer = app.reducer;
export default reducer;
