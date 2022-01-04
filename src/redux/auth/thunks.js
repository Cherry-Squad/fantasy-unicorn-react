import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  ACCESS_TOKEN_HEADER,
  CLIENT_HEADER,
  UID_HEADER,
  EXPIRY_HEADER,
} from "@dict/headers";
import { signInApi, resendConfirmationMailApi } from "@api/auth";
import { normalize } from "normalizr";
import { user } from "@validation/normalizr";
import { setAuthBag, setTokens, setUser } from "./actions";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { usersGetSelfUserThunk } from "@redux/users";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, store) => {
    try {
      const response = await signInApi(email, password);
      const { data, headers } = response;
      const authBag = {
        token: {
          accessToken: headers[ACCESS_TOKEN_HEADER],
          client: headers[CLIENT_HEADER],
          uid: headers[UID_HEADER],
          expiry: headers[EXPIRY_HEADER],
        },
        user: {
          id: data.data.id,
        },
      };
      store.dispatch(setAuthBag(authBag));
      return normalize(data.data, user);
    } catch (e) {
      console.error(e);
      return store.rejectWithValue(e.response.data || e.message);
    }
  }
);

export const resendConfirmationMailThunk = createAsyncThunkWrapped(
  "auth/resendConfirmationMail",
  async ({ email }) => {
    await resendConfirmationMailApi(email);
    return {};
  }
);

export const propagateTokenThunk = createAsyncThunkWrapped(
  "auth/propagateToken",
  async ({ client, expiry, accessToken, uid }, { dispatch }) => {
    dispatch(setTokens({ client, expiry, accessToken, uid }));
    const bag = await dispatch(usersGetSelfUserThunk());
    const id = bag.payload.result;
    dispatch(setUser({ id }));
    return {};
  }
);
