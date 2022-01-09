import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { contestApplication } from "@validation/normalizr";
import { myNormalize } from "@utils/redux";
import {
  deleteApplicationApi,
  getAllApplicationsForCurrentUserApi,
  getAllApplicationsInContestApi,
} from "@api/contestApplication";

export const getApplicationsOfSelfUserThunk = createAsyncThunkWrapped(
  "briefcases/getApplicationsOfSelfUser",
  async () => {
    const response = await getAllApplicationsForCurrentUserApi();
    return myNormalize(response.data, [contestApplication]);
  }
);

export const getApplicationsOfContestThunk = createAsyncThunkWrapped(
  "briefcases/getApplicationsOfContest",
  async ({ contestId }) => {
    const response = await getAllApplicationsInContestApi(contestId);
    return myNormalize(response.data, [contestApplication]);
  }
);

export const deleteApplicationThunk = createAsyncThunkWrapped(
  "briefcases/deleteApplication",
  async ({ id }) => {
    await deleteApplicationApi(id);
    return { id };
  }
);
