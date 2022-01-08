import FormTextField from "@components/FormTextField";
import FullTradingWidget from "@components/FullTradingWidget";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, LinearProgress, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { getOrCreateStockThunk } from "@redux/stocks";
import { unwrapResult } from "@reduxjs/toolkit";
import { useMySnackbar } from "@utils/hooks";
import { addStockSchema } from "@validation/yup";
import TradingViewWidget, { Themes } from "@vendor/TradingViewWidget";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import StockSuggestions from "./StockSuggestions";

const AddStockWidget = ({ onAdd, stopList = [] }) => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(addStockSchema),
    context: { arr: stopList },
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  const watchName = watch("name", "");

  const handleSelect = useCallback(
    (stockName) => setValue("name", stockName, { shouldValidate: true }),
    [setValue]
  );

  const onSubmit = useCallback(
    ({ name }) =>
      dispatch(getOrCreateStockThunk({ name }))
        .then(unwrapResult)
        .then(({ entities, result }) => onAdd(entities.stocks[result]))
        .catch((response) => {
          const { data } = response;
          if (
            data.status === "Not Found 404" ||
            data.error?.startsWith(
              "An Error occurred Finnhub couldn't find symbol"
            )
          ) {
            enqueueError("Акция не найдена!");
          } else {
            enqueueError("Возникла непредвиденная ошибка");
          }
        }),
    [dispatch, onAdd, enqueueError]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextField
          name="name"
          control={control}
          label="Название акции"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            margin: (theme) => theme.spacing(3, 0, 2),
          }}
        >
          Добавить
        </Button>
        {isSubmitting && <LinearProgress />}
      </form>
      <StockSuggestions onSelect={handleSelect} />
      <Divider sx={{ mt: 1, mb: 1 }} />
      <FullTradingWidget symbol={watchName} />
    </>
  );
};

export default AddStockWidget;
