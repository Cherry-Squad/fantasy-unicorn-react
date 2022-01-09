import { Divider, IconButton, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { getAllContestsSelector, getAllContestsThunk } from "@redux/contests";
import { useLoadingRedux, useMySnackbar } from "@utils/hooks";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContestCard from "./ContestCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import { StatusEnum } from "@dict/contest";
import { useIntervalWhen } from "rooks";

const ContestsWidget = () => {
  const { loading, execute } = useLoadingRedux(getAllContestsThunk, {
    enqueue: true,
  });

  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();

  const contests = useSelector(getAllContestsSelector).sort((a, b) => {
    if (a.status !== b.status) {
      const map = { [StatusEnum.CREATED]: 1, [StatusEnum.REG_ENDED]: 2 };
      return map[a.status] - map[b.status];
    } else if (a.status === StatusEnum.CREATED) {
      return Date.parse(a.reg_ending_at) - Date.parse(b.reg_ending_at);
    } else {
      return Date.parse(a.summarizing_at) - Date.parse(b.summarizing_at);
    }
  });

  // uwc-debug
  const cards = useMemo(
    () => contests.map((c) => <ContestCard key={c.id} contest={c} />),
    [contests]
  );

  const handleInterval = useCallback(
    () =>
      dispatch(getAllContestsThunk()).catch((e) =>
        enqueueError(e?.message || e?.data || e)
      ),
    [dispatch, enqueueError]
  );

  useIntervalWhen(handleInterval, 5 * 1000, !loading, true);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          p: 1,
          width: "100%",
          display: "flex",
        }}
      >
        <IconButton onClick={execute} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </Box>
      {loading ? <LinearProgress /> : <Divider />}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          alignContent: "flex-start",
          p: 3,
          rowGap: 3,
        }}
      >
        {cards}
      </Box>
    </Box>
  );
};

export default ContestsWidget;
