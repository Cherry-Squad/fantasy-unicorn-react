import React from "react";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const FantasyPointsThresholdBadge = ({ value, sx = {}, appendLess = true }) => (
  <Box
    sx={{
      display: "flex",
      width: "100%",
      height: "24px",
      alignContent: "center",
      ...sx,
    }}
  >
    <Box>
      <BusinessCenterIcon />
    </Box>
    <Box sx={{ flexGrow: 2 }}>
      <Typography variant="body1" sx={{ textAlign: "right" }}>
        {appendLess ? "<" + +value : value}
      </Typography>
    </Box>
  </Box>
);

export default FantasyPointsThresholdBadge;
