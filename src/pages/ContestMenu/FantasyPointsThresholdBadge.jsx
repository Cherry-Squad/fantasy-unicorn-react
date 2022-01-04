import React from "react";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const FantasyPointsThresholdBadge = ({ value }) => (
  <Box
    sx={{
      display: "flex",
      width: "100%",
      height: "24px",
      alignContent: "center",
    }}
  >
    <Box>
      <BusinessCenterIcon />
    </Box>
    <Box sx={{ flexGrow: 2 }}>
      <Typography variant="body1" sx={{ textAlign: "right" }}>
        {"<" + +value}
      </Typography>
    </Box>
  </Box>
);

export default FantasyPointsThresholdBadge;
