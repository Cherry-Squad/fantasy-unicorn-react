import { useCallback, useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { parseError } from "./parse";

export const useMySnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const enqueueError = useCallback(
    (msg, params) => {
      console.error(msg);
      enqueueSnackbar(parseError(msg), { ...params, variant: "error" });
    },
    [enqueueSnackbar]
  );

  const enqueueInfo = useCallback(
    (msg, params) => enqueueSnackbar(msg, { ...params, variant: "info" }),
    [enqueueSnackbar]
  );

  const enqueueWarning = useCallback(
    (msg, params) => enqueueSnackbar(msg, { ...params, variant: "warning" }),
    [enqueueSnackbar]
  );

  const enqueueSuccess = useCallback(
    (msg, params) => enqueueSnackbar(msg, { ...params, variant: "success" }),
    [enqueueSnackbar]
  );

  const enqueueDefault = useCallback(
    (msg, params) => enqueueSnackbar(msg, { ...params, variant: "default" }),
    [enqueueSnackbar]
  );

  return {
    enqueueDefault,
    enqueueError,
    enqueueInfo,
    enqueueSuccess,
    enqueueWarning,
    enqueueSnackbar,
  };
};

export const useGenericHandleBlurAction = (action, onFulfilled, onError) => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();

  const handleBlurAction = ({ setDisabled }) => {
    setDisabled(true);
    dispatch(action)
      .then(unwrapResult)
      .then((v) => {
        if (onFulfilled !== undefined) onFulfilled(v);
      })
      .catch((err) => {
        if (onError !== undefined) onError(err);
        else enqueueError(err.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return handleBlurAction;
};

export const useParamSelector = (selector, params) => {
  return useSelector((state) => selector(state, params));
};

export const useQueryParams = () => {
  return Object.fromEntries(
    new URLSearchParams(useLocation().search).entries()
  );
};

export const UseLoadingEnum = Object.freeze({
  IDLE: 0,
  PENDING: 1,
  SUCCESS: 2,
  ERROR: 4,
});

export const useLoading = (
  actionCreator,
  { immediate = true, enqueue = false, errorToMsg = null } = {}
) => {
  const [status, setStatus] = useState(UseLoadingEnum.IDLE);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus(UseLoadingEnum.PENDING);
    setValue(null);
    setError(null);
    const action = actionCreator();

    if (action) {
      return dispatch(actionCreator())
        .then(unwrapResult)
        .then((response) => {
          setValue(response);
          setStatus(UseLoadingEnum.SUCCESS);
        })
        .catch((error) => {
          const msg = errorToMsg ? errorToMsg(error) : error;
          setError(msg);
          setStatus(UseLoadingEnum.ERROR);
          if (enqueue) {
            enqueueError(msg);
          }
        });
    }
  }, [actionCreator, dispatch, enqueueError, errorToMsg, enqueue]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const loading = status === UseLoadingEnum.PENDING;

  return {
    execute,
    status,
    value,
    error,
    loading,
    bundle: { loading, error, status },
  };
};

export const useEntityLoading = (
  idField,
  actionCreator,
  loadingParams = {}
) => {
  const params = useParams();
  const id = +params[idField];

  const newActionCreator = useCallback(
    () => actionCreator({ id }),
    [actionCreator, id]
  );

  const loadingObj = useLoading(newActionCreator, loadingParams);

  return { [idField]: id, ...loadingObj };
};

export const useNumberParams = () => {
  const params = useParams();
  return Object.keys(params).reduce(
    (acc, c) => ({ ...acc, [c]: +params[c] }),
    {}
  );
};
