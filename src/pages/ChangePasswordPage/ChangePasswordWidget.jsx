import { sendRecoverPasswordEmailApi } from "@api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMySnackbar, useQueryParams } from "@utils/hooks";
import { changePasswordSchema, recoverPasswordSchema } from "@validation/yup";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIntervalWhen } from "rooks";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import CenteredMarginBox from "@components/CenteredMarginBox";
import CenteredRoundBox from "@components/CenteredRoundBox";
import LockResetIcon from "@mui/icons-material/LockReset";
import MyLink from "@components/MyLink";
import FormTextField from "@components/FormTextField";
import { changePasswordWithTokenThunk } from "@redux/auth";
import { unwrapResult } from "@reduxjs/toolkit";

const RequestEmailForm = ({ sendOncePer = 60 }) => {
  const [delay, setDelay] = useState(0);
  const { enqueueError, enqueueSuccess } = useMySnackbar();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(recoverPasswordSchema),
    mode: "all",
    defaultValues: { email: "" },
  });

  useIntervalWhen(() => setDelay(delay - 1), 1000, delay > 0, false);

  const onSubmit = useCallback(
    ({ email }) =>
      sendRecoverPasswordEmailApi({ email })
        .then(() =>
          enqueueSuccess(
            "Письмо на восстановление пароля было успешно выслано!"
          )
        )
        .catch((e) => {
          enqueueError("Возникла непредвиденная ошибка");
        })
        .finally(() => {
          setDelay(sendOncePer);
        }),
    [setDelay, enqueueError, sendOncePer, enqueueSuccess]
  );

  const disabled = delay > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTextField
        name="email"
        control={control}
        variant="outlined"
        margin="normal"
        label="Email"
        type="email"
        fullWidth
        required
        autoComplete="username"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={disabled}
        sx={{
          margin: (theme) => theme.spacing(3, 0, 2),
        }}
      >
        Запросить письмо {disabled && `(${delay} секунд)`}
      </Button>
      {isSubmitting && <LinearProgress />}
    </form>
  );
};

const ChangePasswordForm = ({ token }) => {
  const navigate = useNavigate();
  const { enqueueError } = useMySnackbar();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: "all",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = useCallback(
    ({ password }) =>
      dispatch(changePasswordWithTokenThunk({ password, token }))
        .then(unwrapResult)
        .then(() => navigate("/"))
        .catch((e) => {
          if (e.status === 401) {
            enqueueError("Токен более недействителен");
          } else {
            enqueueError("Возникла непредвиденная ошибка");
          }
        }),
    [enqueueError, dispatch, navigate, token]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormTextField
            name="password"
            control={control}
            type="password"
            label="Пароль"
            autoComplete="new-password"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            name="confirmPassword"
            control={control}
            type="password"
            label="Повторите пароль"
            autoComplete="new-password"
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          margin: (theme) => theme.spacing(3, 0, 2),
        }}
      >
        Сменить пароль
      </Button>
      {isSubmitting && <LinearProgress />}
    </form>
  );
};

const ChangePasswordRequestWidget = ({ sendOncePer = 60 }) => {
  const { reset_password_token: token } = useQueryParams();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <CenteredMarginBox>
        <CenteredRoundBox>
          <LockResetIcon />
        </CenteredRoundBox>
        <Typography component="h1" variant="h5">
          Восстановление пароля
        </Typography>
        {token ? (
          <ChangePasswordForm token={token} />
        ) : (
          <RequestEmailForm sendOncePer={sendOncePer} />
        )}
        <Grid container>
          <Grid item xs>
            <MyLink to="/login">Войти</MyLink>
          </Grid>
          <Grid item>
            <MyLink to="/sign_up">Зарегистрироваться</MyLink>
          </Grid>
        </Grid>
      </CenteredMarginBox>
    </Container>
  );
};

export default ChangePasswordRequestWidget;
