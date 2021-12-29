import React from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { loginThunk } from "@redux/auth/thunks";
import { useMySnackbar } from "@utils/hooks";
import { emailPasswordSchema } from "@validation/yup";
import { useForm } from "react-hook-form";
import FormTextField from "@components/FormTextField";
import { Box } from "@mui/system";
import MyLink from "@components/MyLink";
import CenteredMarginBox from "@components/CenteredMarginBox";
import CenteredRoundBox from "@components/CenteredRoundBox";

export default function LoginWidget({ redirectTo = "/dashboard" }) {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueError } = useMySnackbar();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({ validationSchema: emailPasswordSchema });

  const onSubmit = ({ email, password }) =>
    dispatch(loginThunk({ email, password }))
      .then(unwrapResult)
      .then(() => {
        navigate(redirectTo, { replace: true });
      })
      .catch((e) => {
        if (e.message.endsWith("401")) {
          enqueueError("Неверный email или пароль");
        } else {
          enqueueError("Возникла непредвиденная ошибка");
        }
      });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <CenteredMarginBox>
        <CenteredRoundBox>
          <CheckCircleOutlineIcon />
        </CenteredRoundBox>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormTextField
            name="email"
            control={control}
            variant="outlined"
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            autoComplete="username"
          />
          <FormTextField
            name="password"
            control={control}
            variant="outlined"
            margin="normal"
            label="Пароль"
            type="password"
            fullWidth
            required
            autoComplete="current-password"
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
            Войти
          </Button>
          {isSubmitting && <LinearProgress />}
          <Grid container>
            <Grid item xs>
              <MyLink to="" href="#">
                {"Забыли пароль?"}
              </MyLink>
            </Grid>
            <Grid item>
              <MyLink to="/sign_up">{"Нет аккаунта? Зарегистрируйтесь"}</MyLink>
            </Grid>
          </Grid>
        </form>
      </CenteredMarginBox>
    </Container>
  );
}
