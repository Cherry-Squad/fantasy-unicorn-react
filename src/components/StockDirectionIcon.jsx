import React from "react";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { red } from "@mui/material/colors";

const StockDirectionIcon = ({ up, down, colored, ...props }) => {
  return down && !up ? (
    <SouthEastIcon sx={colored ? { color: red[500] } : undefined} {...props} />
  ) : (
    <NorthEastIcon color={colored ? "success" : undefined} {...props} />
  );
};

export default StockDirectionIcon;
