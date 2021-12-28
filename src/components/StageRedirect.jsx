import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { getSelfUserStageSelector } from "@redux/users";

export const getStageRedirectTo = (stage) => {
  switch (stage) {
    case -1:
      return "/user/login";
    case 0:
      return "/user/validate";
    case 1:
      return "/hacker-form/step1";
    case 2:
      return "/hacker-form/step2";
    default:
      return "/dashboard";
  }
};

const StageRedirect = ({ ...rest }) => {
  const stage = useSelector(getSelfUserStageSelector);

  const to = getStageRedirectTo(stage);

  return <Redirect to={to} {...rest} />;
};

export default StageRedirect;
