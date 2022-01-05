import React from "react";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Tooltip } from "@mui/material";
import { amber } from "@mui/material/colors";
import { InvertedStockPricesRu } from "@dict/contest";

const ContestInvertedStockPricesIcon = ({ useInvertedStockPrices }) => {
  return (
    <Tooltip title={InvertedStockPricesRu[useInvertedStockPrices]}>
      {useInvertedStockPrices ? (
        <FlipCameraAndroidIcon sx={{ color: amber[500] }} />
      ) : (
        <ShowChartIcon color="primary" />
      )}
    </Tooltip>
  );
};

export default ContestInvertedStockPricesIcon;
