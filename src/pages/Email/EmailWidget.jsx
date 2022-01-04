import React, { useCallback, useMemo, useState } from "react";
import { Container, CssBaseline, Grid, Link, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { resendConfirmationMailThunk } from "@redux/auth/thunks";
import { useMySnackbar } from "@utils/hooks";
import CenteredMarginBox from "@components/CenteredMarginBox";
import CenteredRoundBox from "@components/CenteredRoundBox";
import { useIntervalWhen } from "rooks";
import { useSearchParams } from "react-router-dom";
import MyLink from "@components/MyLink";

const EmailWidget = ({ userEmail, sendOncePer = 60 }) => {
  const dispatch = useDispatch();
  const { enqueueError, enqueueSuccess } = useMySnackbar();
  const [delay, setDelay] = useState(sendOncePer);

  useIntervalWhen(() => setDelay(delay - 1), 1000, delay > 0, false);

  const onSendEmail = useCallback(
    (email) => {
      dispatch(resendConfirmationMailThunk({ email }))
        .then(unwrapResult)
        .then(() => enqueueSuccess("Письмо было повторно отправлено"))
        .catch(() => enqueueError("Возникла непредвиденная ошибка"))
        .finally(() => setDelay(sendOncePer));
    },
    [dispatch, enqueueError, enqueueSuccess, sendOncePer]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <CenteredMarginBox>
        <CenteredRoundBox>
          <EmailIcon />
        </CenteredRoundBox>
        <Typography component="h1" variant="h5">
          Подтверждение email
        </Typography>
        <Typography variant="body1" color="text.primary" align="center">
          На ваш email {userEmail} было отправлено письмо с ссылкой на
          подтверждение регистрации. Перейдите по ней для завершения
          регистрации.
        </Typography>
        <Grid container>
          <Grid item xs>
            <Link
              component="button"
              variant="body2"
              onClick={() => onSendEmail(userEmail)}
              disabled={delay > 0}
            >
              Отправить письмо {delay > 0 && `(${delay} секунд)`}
            </Link>
          </Grid>
          <Grid item>
            <MyLink to="/logout">Выйти</MyLink>
          </Grid>
        </Grid>
      </CenteredMarginBox>
    </Container>
  );
};

const SearchParamsEmailWidget = () => {
  const [searchParams] = useSearchParams();
  const email = useMemo(() => searchParams.get("email"), [searchParams]);
  return <EmailWidget userEmail={email} />;
};

export default SearchParamsEmailWidget;
