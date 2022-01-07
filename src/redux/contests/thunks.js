import { contest } from "@validation/normalizr";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { getAllContestsApi, getContestByIdApi } from "@api/contest";
import { myNormalize } from "@utils/redux";

export const getAllContestsThunk = createAsyncThunkWrapped(
  "contests/getAllContests",
  async () => {
    const response = await getAllContestsApi();
    return myNormalize(response.data, [contest]);
  }
);

export const getContestByIdThunk = createAsyncThunkWrapped(
  "contests/getContestById",
  async ({ id }) => {
    const response = await getContestByIdApi(id);
    return myNormalize(response.data, contest);
  }
);
