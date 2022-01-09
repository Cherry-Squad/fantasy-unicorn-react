import { signUpApi, getSelfUserApi } from "@api";
import { loginThunk } from "@redux/auth";
import { user } from "@validation/normalizr";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { myNormalize } from "@utils/redux";
import { getScoreboardApi } from "@api/user";

export const usersCreateThunk = createAsyncThunkWrapped(
  "users/create",
  async ({ username, email, password }, { dispatch }) => {
    const response = await signUpApi({ username, email, password });
    await dispatch(loginThunk({ email, password }));
    return myNormalize(response.data.data, user);
  }
);

export const usersGetSelfUserThunk = createAsyncThunkWrapped(
  "users/getSelfUser",
  async () => {
    const response = await getSelfUserApi();
    return myNormalize(response.data.data, user);
  }
);

export const getGlobalLeaderboardThunk = createAsyncThunkWrapped(
  "users/getGlobalLeaderboard",
  async () => {
    const response = await getScoreboardApi();
    return {
      ...myNormalize(response.data, [user]),
      order: response.data.map((u) => u.id),
    };
  }
);
