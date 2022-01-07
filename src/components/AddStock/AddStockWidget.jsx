import FormTextField from "@components/FormTextField";
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

const AddStockWidget = ({ onAdd, stopList = [] }) => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
    watch,
  } = useForm({
    resolver: yupResolver(addStockSchema),
    context: { arr: stopList },
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  const watchName = watch("name", "");

  const onSubmit = ({ name }) =>
    dispatch(getOrCreateStockThunk({ name }))
      .then(unwrapResult)
      .then(({ entities, result }) => onAdd(entities.stocks[result]))
      .catch((response) => {
        console.error(response);
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
      });

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
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography variant="caption" color={red[500]}>
        Внимание: данный график не связан с курсом акций и их наличием на
        сервере! Доступны акции только американских торговых площадок.
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <TradingViewWidget
          symbol={watchName}
          autosize
          locale="ru"
          interval={5}
          theme={Themes.LIGHT}
        />
      </Box>
    </>
  );
};

export default AddStockWidget;
