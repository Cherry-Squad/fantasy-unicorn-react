import React, { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import {
  loadingSelector,
  initApplication,
  errorSelector,
  AppStateEnum,
} from "@redux/app";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const PreloaderWrapper = ({ children }) => {
  const { dispatch } = useStore();
  const loadingState = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (loadingState === AppStateEnum.OFF) {
      dispatch(initApplication());
    }
  }, [loadingState, dispatch]);

  const classes = useStyles();

  const initialLoading =
    loadingState === AppStateEnum.INITIALIZING ||
    loadingState === AppStateEnum.OFF;
  const loadingCausedError = error !== null;

  return (
    <>
      {initialLoading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {!initialLoading && loadingCausedError && (
        <Backdrop className={classes.backdrop} open={true}>
          <h1>Что-то пошло не так!</h1>
        </Backdrop>
      )}
      {!initialLoading && !loadingCausedError && children}
    </>
  );
};

export default PreloaderWrapper;
