import React from "react";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import StairsIcon from "@mui/icons-material/Stairs";
import { Tooltip } from "@mui/material";
import { teal } from "@mui/material/colors";

const ContestMultipliersIcon = ({ useDisabledMultipliers }) => {
  return useDisabledMultipliers ? (
    <Tooltip title="Без системы множителей">
      <TrendingFlatIcon sx={{ color: teal[500] }} />
    </Tooltip>
  ) : (
    <Tooltip title="С системой множителей">
      <StairsIcon color="primary" />
    </Tooltip>
  );
};

export default ContestMultipliersIcon;
