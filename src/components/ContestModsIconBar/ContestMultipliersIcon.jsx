import React from "react";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import StairsIcon from "@mui/icons-material/Stairs";
import { Tooltip } from "@mui/material";
import { teal } from "@mui/material/colors";
import { MultipliersRu } from "@dict/contest";

const ContestMultipliersIcon = ({ useDisabledMultipliers }) => {
  return (
    <Tooltip title={MultipliersRu[useDisabledMultipliers]}>
      {useDisabledMultipliers ? (
        <TrendingFlatIcon sx={{ color: teal[500] }} />
      ) : (
        <StairsIcon color="primary" />
      )}
    </Tooltip>
  );
};

export default ContestMultipliersIcon;
