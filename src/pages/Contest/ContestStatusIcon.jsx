import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LockIcon from "@mui/icons-material/Lock";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { StatusEnum, StatusRu } from "@dict/contest";
import { Tooltip } from "@mui/material";
import { indigo, red } from "@mui/material/colors";

const ContestStatusIcon = ({ status }) => {
  const icon = (() => {
    switch (status) {
      case StatusEnum.CREATED:
        return <AppRegistrationIcon color="success" fontSize="large" />;
      case StatusEnum.REG_ENDED:
        return <LockIcon sx={{ color: red["A700"] }} fontSize="large" />;
      case StatusEnum.FINISHED:
        return <SportsScoreIcon sx={{ color: indigo[500] }} fontSize="large" />;
      default:
        return status;
    }
  })();
  return <Tooltip title={StatusRu[status]}>{icon}</Tooltip>;
};

export default ContestStatusIcon;
