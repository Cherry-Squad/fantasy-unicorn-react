import React from "react";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PublicIcon from "@mui/icons-material/Public";
import { Tooltip } from "@mui/material";
import { brown } from "@mui/material/colors";
import { BriefcaseOnlyRu } from "@dict/contest";

const ContestUseBriefcaseOnlyIcon = ({ useBriefcaseOnly }) => {
  return (
    <Tooltip title={BriefcaseOnlyRu[useBriefcaseOnly]}>
      {useBriefcaseOnly ? (
        <BusinessCenterIcon sx={{ color: brown[500] }} />
      ) : (
        <PublicIcon color="success" />
      )}
    </Tooltip>
  );
};

export default ContestUseBriefcaseOnlyIcon;
