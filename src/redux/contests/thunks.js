import { normalize } from "normalizr";
import { contest } from "@validation/normalizr";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { getAllContestsApi } from "@api/contest";

export const getAllContestsThunk = createAsyncThunkWrapped(
  "contests/getAllContests",
  async () => {
    console.log("hi!");
    const response = await getAllContestsApi();
    console.log(response, normalize(response.data, [contest]));
    return normalize(response.data, [contest]);
  }
);
