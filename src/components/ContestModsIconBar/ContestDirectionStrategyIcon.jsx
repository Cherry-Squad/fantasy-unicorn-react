import { DirectionStrategyEnum, DirectionStrategyRu } from "@dict/contest";
import React from "react";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import { Tooltip } from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";

const ContestDirectionStrategyIcon = ({
  directionStrategy,
  fixedDirectionUp,
}) => {
  const title =
    DirectionStrategyRu[directionStrategy][fixedDirectionUp ? "up" : "down"] ||
    directionStrategy;

  const icon = (() => {
    switch (directionStrategy) {
      case DirectionStrategyEnum.FREE:
        return <CallSplitIcon color="primary" />;
      case DirectionStrategyEnum.FIXED:
        if (fixedDirectionUp) {
          return <NorthEastIcon color="success" />;
        } else {
          return <SouthEastIcon sx={{ color: red[500] }} />;
        }
      case DirectionStrategyEnum.SINGLE_PER_USER:
        return <CallMergeIcon sx={{ color: deepPurple[500] }} />;
      default:
        return directionStrategy + ":" + fixedDirectionUp;
    }
  })();

  return <Tooltip title={title}>{icon}</Tooltip>;
};

export default ContestDirectionStrategyIcon;
