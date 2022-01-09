import { Divider, IconButton, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { getAllContestsSelector, getAllContestsThunk } from "@redux/contests";
import { useLoadingRedux } from "@utils/hooks";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ContestCard from "./ContestCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import { StatusEnum } from "@dict/contest";

const ContestsWidget = () => {
  const { loading, execute } = useLoadingRedux(getAllContestsThunk, {
    enqueue: true,
  });

  const contests = useSelector(getAllContestsSelector).sort((a, b) => {
    if (a.status !== b.status) {
      const map = { [StatusEnum.CREATED]: 1, [StatusEnum.REG_ENDED]: 2 };
      return map[a.status] - map[b.status];
    } else if (a.status === StatusEnum.REG_ENDED) {
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
