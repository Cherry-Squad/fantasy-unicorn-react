import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { contestApplicationStocks } from "@validation/normalizr";
import { myNormalize } from "@utils/redux";
import { getApplicationStocksForContestApi } from "@api/applicationStock";

export const getApplicationStocksForContestIdThunk = createAsyncThunkWrapped(
  "briefcases/getApplicationsOfSelfUser",
  async ({ contestId }) => {
    const response = await getApplicationStocksForContestApi(contestId);
    return myNormalize(response.data, [contestApplicationStocks]);
  }
);
