import React from "react";
import { useSelector } from "react-redux";

import { getSelfUserStageSelector } from "@redux/users";
import { Route } from "react-router-dom";
import StageRedirect from "@components/StageRedirect";

const StageRoute = ({
  stage: expectedStage,
  path,
  exact = false,
  component,
}) => {
  const stage = useSelector(getSelfUserStageSelector);

  const decision = (() => {
    if (expectedStage.includes) {
      return expectedStage.includes(stage);
    } else {
      return stage === expectedStage;
    }
  })();

  return decision ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <StageRedirect from={path} exact={exact} />
  );
};

export default StageRoute;
