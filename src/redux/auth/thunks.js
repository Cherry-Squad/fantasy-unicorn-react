import { createAsyncThunk } from "@reduxjs/toolkit";

import { signInApi } from "@api/auth";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, store) => {
    try {
      const { data, headers } = await signInApi(email, password); //TODO: fix login
      const authBag = {
        token: {
          accessToken: headers["Access-Token"],
          client: headers["Client"],
          uid: headers["Uid"],
          expiry: headers["Expiry"],
        },
        user: {
          id: data.data.id,
        },
      };
      return authBag;
    } catch (e) {
      return store.rejectWithValue(e.response.data || e.message);
    }
  }
);
