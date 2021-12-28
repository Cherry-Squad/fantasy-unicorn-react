import { createAsyncThunk } from "@reduxjs/toolkit";

import { localStorageSet } from "@utils/tokens";
import { loginPost } from "@api/auth";
import { getSelf } from "@redux/users";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, store) => {
    try {
      const { data } = await loginPost(email, password);
      localStorageSet(store, data);
      await store.dispatch(getSelf());
      return data;
    } catch (e) {
      return store.rejectWithValue(e.response.data || e.message);
    }
  }
);
