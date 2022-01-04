import { Box } from "@mui/system";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Typography } from "@mui/material";

const CoinsEntryFeeBadge = ({ value }) => (
  <Box
    sx={{
      display: "flex",
      width: "100%",
      height: "24px",
      alignContent: "center",
    }}
  >
    <Box>
      <AttachMoneyIcon />
    </Box>
    <Box sx={{ flexGrow: 1, pr: 1 }}>
      <Typography variant="body1" sx={{ textAlign: "right" }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export default CoinsEntryFeeBadge;
