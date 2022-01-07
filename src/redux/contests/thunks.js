import { normalize } from "normalizr";
import { contest } from "@validation/normalizr";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { getAllContestsApi, getContestByIdApi } from "@api/contest";

export const getAllContestsThunk = createAsyncThunkWrapped(
  "contests/getAllContests",
  async () => {
    const response = await getAllContestsApi();
    return normalize(response.data || [], [contest]);
  }
);

export const getContestByIdThunk = createAsyncThunkWrapped(
  "contests/getContestById",
  async ({ id }) => {
    const response = await getContestByIdApi(id);
    return response.data && normalize(response.data, contest);
  }
);
