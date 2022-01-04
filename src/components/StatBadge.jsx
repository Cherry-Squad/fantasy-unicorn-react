import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { numberWithCommas } from "@utils/format";
import React from "react";

const StatBadge = ({ icon: Icon, value }) => (
  <Box
    sx={{
      display: "flex",
      m: 1,
      minWidth: "120px",
      height: "24px",
      alignContent: "center",
    }}
  >
    <Icon fontSize="small" />
    <Typography
      color="inherit"
      variant="body2"
      align="right"
      sx={{ flexGrow: 1, fontSize: "1rem", lineHeight: "24px" }}
    >
      {numberWithCommas(value)}
    </Typography>
  </Box>
);

export default StatBadge;
