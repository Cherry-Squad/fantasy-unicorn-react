import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LockIcon from "@material-ui/icons/Lock";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Field, Form, Formik } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";

import VkLogo from "@assets/vk-logo.svg";
import GoogleLogo from "@assets/google-logo.svg";
import GitLogo from "@assets/GitHub-logo.svg";
import { userCreate } from "@redux/users";
import { parseErrorMessage } from "@utils/parse";
import { useMySnackbar } from "@utils/hooks";
import { registrationSchema } from "@validation/yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  avatarLogo: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkDecor: {
    color: theme.palette.primary.main,
  },
}));

export default function SignUpWidget() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const [redirect, setRedirect] = useState(false);

  const onSubmit = ({ email, password }) =>
    dispatch(userCreate({ email, password }))
      .then(unwrapResult)
      .then(() => setRedirect(true))
      .catch((error) => {
        if (error.message === "Email already exist") {
          enqueueError(parseErrorMessage(error.message) || error.message);
        } else {
          enqueueError("Что-то пошло не так...");
        }
      });

  if (redirect) {
    return <Redirect to="/user/validate" />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Зарегистрироваться
          </Typography>
          <Grid container spacing={4} justify={"center"}>
            <Grid item xs={6} sm={2}>
              <Link to="/oauth2/authorization/vk">
                <Avatar src={VkLogo} className={classes.avatarLogo} />
              </Link>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Link to="/oauth2/authorization/google">
                <Avatar src={GoogleLogo} className={classes.avatarLogo} />
              </Link>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Link to="/oauth2/authorization/github">
                <Avatar src={GitLogo} className={classes.avatarLogo} />
              </Link>
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              privacyPolicyAgreement: false,
            }}
            validationSchema={registrationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="email"
                      label="Email"
                      autoComplete="username"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label="Пароль"
                      autoComplete="new-password"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="confirmPassword"
                      type="password"
                      label="Повторите пароль"
                      autoComplete="new-password"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name="privacyPolicyAgreement"
                      Label={{
                        label:
                          "Я согласен с политикой конфиденциальности и на обработку моих персональных данных",
                      }}
                      required
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Зарегистрироваться
                </Button>
                {isSubmitting && <LinearProgress />}
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/user/login" className={classes.linkDecor}>
                      Уже есть аккаунт? Войти
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    );
  }
}
