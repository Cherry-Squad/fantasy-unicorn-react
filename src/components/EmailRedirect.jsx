import { propagateTokenThunk } from "@redux/auth";
import { UseLoadingEnum, useLoadingRedux, useQueryParams } from "@utils/hooks";
import React, { useCallback, useMemo } from "react";
import { Navigate } from "react-router-dom";
import BigProcess from "./BigProcess";

const EmailRedirect = () => {
  const {
    client_id: client,
    expiry,
    token: accessToken,
    uid,
  } = useQueryParams();

  const actionCreator = useCallback(
    () => propagateTokenThunk({ client, expiry, accessToken, uid }),
    [client, expiry, accessToken, uid]
  );

  const { status } = useLoadingRedux(actionCreator);
  console.log("i was rerendered", status);
  const redirect = useMemo(
    () => [UseLoadingEnum.SUCCESS, UseLoadingEnum.ERROR].includes(status),
    [status]
  );

  return redirect ? <Navigate to="/" replace /> : <BigProcess />;
};

export default EmailRedirect;
