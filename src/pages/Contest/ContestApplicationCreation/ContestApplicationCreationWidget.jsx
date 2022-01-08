import { BRIEFCASE_STOCK_COUNT } from "@dict/briefcase";
import {
  Button,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MakeStockListForm from "./MakeStockListForm";
import SetDirectionsForm from "./SetDirectionsForm";
import SetMultipliersForm from "./SetMultipliersForm";

const ContestApplicationCreationWidget = ({ contest }) => {
  const {
    id,
    status,
    reg_ending_at: regEndingAt,
    summarizing_at: summarizingAt,
    coins_entry_fee: coinsEntryFee,
    max_fantasy_points_threshold: maxFantasyPointsThreshold,
    use_briefcase_only: useBriefcaseOnly,
    direction_strategy: directionStrategy,
    fixed_direction_up: fixedDirectionUp,
    use_disabled_multipliers: useDisabledMultipliers,
    use_inverted_stock_prices: useInvertedStockPrices,
    created_at: createdAt,
  } = contest;

  const [stocks, setStocks] = useState([]);
  const [directions, setDirections] = useState({});
  const [multipliers, setMultipliers] = useState({});
  const [step, setStep] = useState(0);

  const handleOnNextClick = useCallback(
    () => setStep((step) => step + 1),
    [setStep]
  );
  const handleOnPrevClick = useCallback(
    () => setStep((step) => step - 1),
    [setStep]
  );
  const handleOnSubmitClick = useCallback(() => {
    console.log(stocks, directions, multipliers);
  });

  const canGoNext = (() => {
    switch (step) {
      case 0:
        return stocks.length === BRIEFCASE_STOCK_COUNT;
      case 1:
        return Object.keys(directions).length === stocks.length;
      case 2:
        return Object.keys(multipliers).length === stocks.length;
      default:
        return false;
    }
  })();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Регистрация на конкурс
      </Typography>
      <Stepper activeStep={step} sx={{ p: 2 }}>
        <Step>
          <StepLabel>Выберите акции</StepLabel>
        </Step>
        <Step>
          <StepLabel>Сделайте предсказания</StepLabel>
        </Step>
        <Step>
          <StepLabel>Определите множители</StepLabel>
        </Step>
      </Stepper>
      <Divider sx={{ mt: 1, mb: 2 }} />
      {step === 0 && (
        <MakeStockListForm
          contest={contest}
          stocks={stocks}
          setStocks={setStocks}
        />
      )}
      {step === 1 && (
        <SetDirectionsForm
          contest={contest}
          stocks={stocks}
          directions={directions}
          setDirections={setDirections}
        />
      )}
      {step === 2 && (
        <SetMultipliersForm
          contest={contest}
          stocks={stocks}
          directions={directions}
          multipliers={multipliers}
          setMultipliers={setMultipliers}
        />
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button
          variant="outlined"
          disabled={step === 0}
          onClick={handleOnPrevClick}
        >
          Назад
        </Button>
        {step !== 2 ? (
          <Button
            variant="contained"
            disabled={!canGoNext}
            onClick={handleOnNextClick}
          >
            Далее
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={!canGoNext}
            onClick={handleOnSubmitClick}
          >
            Отправить
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ContestApplicationCreationWidget;
