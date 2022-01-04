import { DirectionStrategyEnum } from "@dict/contest";
import React from "react";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import { Tooltip } from "@mui/material";
import { deepPurple, green, red } from "@mui/material/colors";

const ContestDirectionStrategyIcon = ({
  directionStrategy,
  fixedDirectionUp,
}) => {
  switch (directionStrategy) {
    case DirectionStrategyEnum.FREE:
      return (
        <Tooltip title="Свободный выбор направлений">
          <CallSplitIcon color="primary" />
        </Tooltip>
      );
    case DirectionStrategyEnum.FIXED:
      if (fixedDirectionUp) {
        return (
          <Tooltip title="Фиксированно вверх">
            <NorthEastIcon color="success" />
          </Tooltip>
        );
      } else {
        return (
          <Tooltip title="Фиксированно вниз">
            <SouthEastIcon sx={{ color: red[500] }} />
          </Tooltip>
        );
      }
    case DirectionStrategyEnum.SINGLE_PER_USER:
      return (
        <Tooltip title="Один выбор направления">
          <CallMergeIcon sx={{ color: deepPurple[500] }} />
        </Tooltip>
      );
    default:
      return (
        <>
          {directionStrategy}:{fixedDirectionUp}
        </>
      );
  }
};

export default ContestDirectionStrategyIcon;
