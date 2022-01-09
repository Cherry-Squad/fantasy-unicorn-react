import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useDocumentTitle } from "@utils/hooks";
import React, { useCallback, useState } from "react";
import ContestsWidget from "@pages/ContestsPage/ContestsWidget";
import BriefcaseWidget from "@components/BriefcaseWidget";
import FullTradingWidget from "@components/FullTradingWidget";
import { Box } from "@mui/system";
import StockClickListenerContext from "@components/StockClickListenerContext";

const MainPage = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const handleStockClick = useCallback(
    (name) => {
      setSymbol(name);
    },
    [setSymbol]
  );
  useDocumentTitle("Главная");
  return (
    <StockClickListenerContext.Provider value={handleStockClick}>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Paper>
            <Typography variant="h4" sx={{ pt: 2, pl: 2 }} color="primary">
              Портфель
            </Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <BriefcaseWidget />
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ display: "flex", minHeight: "600px" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Typography variant="h4" sx={{ pt: 2, pl: 2 }} color="primary">
              Виджет
            </Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                flexGrow: 1,
              }}
            >
              <FullTradingWidget
                symbol={symbol}
                sx={{
                  height: "100%",
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" sx={{ pt: 2, pl: 2 }} color="primary">
              Конкурсы
            </Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ContestsWidget />
          </Paper>
        </Grid>
      </Grid>
    </StockClickListenerContext.Provider>
  );
};

export default MainPage;
