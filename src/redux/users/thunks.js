import { signUpApi, getSelfUserApi } from "@api";
import { loginThunk } from "@redux/auth";
import { normalize } from "normalizr";
import { user } from "@validation/normalizr";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";

export const usersCreateThunk = createAsyncThunkWrapped(
  "users/create",
  async ({ username, email, password }, { dispatch }) => {
    const response = await signUpApi({ username, email, password });
    await dispatch(loginThunk({ email, password }));
    return normalize(response.data.data, user);
  }
);

export const usersGetSelfUserThunk = createAsyncThunkWrapped(
  "users/getSelfUser",
  async () => {
    const response = await getSelfUserApi();
    return normalize(response.data.data, user);
  }
);
