import React from "react";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Tooltip } from "@mui/material";
import { amber } from "@mui/material/colors";

const ContestInvertedStockPricesIcon = ({ useInvertedStockPrices }) => {
  return useInvertedStockPrices ? (
    <Tooltip title="Инвертированные стоимости">
      <FlipCameraAndroidIcon sx={{ color: amber[500] }} />
    </Tooltip>
  ) : (
    <Tooltip title="Обычные стоимости">
      <ShowChartIcon color="primary" />
    </Tooltip>
  );
};

export default ContestInvertedStockPricesIcon;
