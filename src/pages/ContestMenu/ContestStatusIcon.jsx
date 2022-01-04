import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LockIcon from "@mui/icons-material/Lock";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { StatusEnum } from "@dict/contest";
import { Tooltip } from "@mui/material";
import { indigo, red } from "@mui/material/colors";

const ContestStatusIcon = ({ status }) => {
  switch (status) {
    case StatusEnum.CREATED:
      return (
        <Tooltip title="Открыта регистрация">
          <AppRegistrationIcon color="success" fontSize="large" />
        </Tooltip>
      );
    case StatusEnum.REG_ENDED:
      return (
        <Tooltip title="Регистрация закрыта">
          <LockIcon sx={{ color: red["A700"] }} fontSize="large" />
        </Tooltip>
      );
    case StatusEnum.FINISHED:
      return (
        <Tooltip title="Конкурс окончен">
          <SportsScoreIcon sx={{ color: indigo[500] }} fontSize="large" />
        </Tooltip>
      );
    default:
      return <>{status}</>;
  }
};

export default ContestStatusIcon;
