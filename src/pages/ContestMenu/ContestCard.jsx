import { Paper } from "@mui/material";
import React from "react";

const ContestCard = ({ contest }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: "240px",
        height: "180px",
        p: 3,
        mr: 3,
      }}
    >
      {contest.id}
    </Paper>
  );
};

export default ContestCard;
