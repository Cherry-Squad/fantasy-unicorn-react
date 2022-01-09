import FullTradingWidget from "@components/FullTradingWidget";
import StockClickListenerContext from "@components/StockClickListenerContext";
import { StatusEnum } from "@dict/contest";
import { Button, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import ContestApplicationCreationWidget from "./ContestApplicationCreation";

const RegisterToContestBar = ({ contest, notRegistered = true }) => {
  const [openRegisterWidget, setOpenRegisterWidget] = useState(false);
  const [symbol, setSymbol] = useState("AAPL");
  const canRegister = notRegistered && contest.status === StatusEnum.CREATED;
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    if (!canRegister) {
      setOpenRegisterWidget(false);
    }
  }, [canRegister, setOpenRegisterWidget]);

  const onRegisterClick = useCallback(() => {
    setOpenRegisterWidget((v) => !v);
  }, [setOpenRegisterWidget]);

  const handleStockClick = useCallback(
    (name) => {
      setSymbol(name);
    },
    [setSymbol]
  );

  return (
    <StockClickListenerContext.Provider value={handleStockClick}>
      <Box>
        {canRegister && (
          <Button variant="outlined" onClick={onRegisterClick}>
            {openRegisterWidget ? "Закрыть" : "Зарегистрироваться на конкурс"}
          </Button>
        )}
        {openRegisterWidget && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              flexDirection: largeScreen ? "row" : "column",
            }}
          >
            <ContestApplicationCreationWidget
              contest={contest}
              onStockClick={handleStockClick}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: largeScreen ? undefined : "500px",
                flexGrow: 1,
              }}
            >
              <FullTradingWidget
                sx={{
                  height: "100%",
                }}
                symbol={symbol}
              />
            </Box>
          </Box>
        )}
      </Box>
    </StockClickListenerContext.Provider>
  );
};

export default RegisterToContestBar;
