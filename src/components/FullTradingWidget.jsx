import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import TradingViewWidget, { Themes } from "@vendor/TradingViewWidget";
import React from "react";

const FullTradingWidget = ({ symbol = undefined, sx = { flexGrow: 1 } }) => (
  <>
    <Typography variant="caption" color={red[500]}>
      Внимание: данный график не связан с курсом акций и их наличием на сервере!
      На сайте доступны акции только американских торговых площадок.
    </Typography>
    <Box sx={sx}>
      <TradingViewWidget
        symbol={symbol}
        autosize
        locale="ru"
        interval={5}
        theme={Themes.LIGHT}
      />
    </Box>
  </>
);

export default FullTradingWidget;
