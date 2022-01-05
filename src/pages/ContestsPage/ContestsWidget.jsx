import { Divider, IconButton, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { getAllContestsSelector, getAllContestsThunk } from "@redux/contests";
import { useLoading } from "@utils/hooks";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ContestCard from "./ContestCard";
import RefreshIcon from "@mui/icons-material/Refresh";

const ContestsWidget = () => {
  const { loading, execute } = useLoading(getAllContestsThunk, {
    enqueue: true,
  });

  const contests = useSelector(getAllContestsSelector);

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
