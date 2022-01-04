import React from "react";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PublicIcon from "@mui/icons-material/Public";
import { Tooltip } from "@mui/material";
import { brown } from "@mui/material/colors";

const ContestUseBriefcaseOnlyIcon = ({ useBriefcaseOnly }) => {
  return useBriefcaseOnly ? (
    <Tooltip title="Только акции из портфеля">
      <BusinessCenterIcon sx={{ color: brown[500] }} />
    </Tooltip>
  ) : (
    <Tooltip title="Свободный выбор акций">
      <PublicIcon color="success" />
    </Tooltip>
  );
};

export default ContestUseBriefcaseOnlyIcon;
