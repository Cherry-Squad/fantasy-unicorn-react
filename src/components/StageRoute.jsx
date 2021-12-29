import React from "react";
import { useSelector } from "react-redux";

import { getSelfUserStageSelector } from "@redux/users";
import { Outlet } from "react-router-dom";
import StageRedirect from "@components/StageRedirect";

const StageRoute = ({ stage: expectedStage }) => {
  const stage = useSelector(getSelfUserStageSelector);

  const decision = (() => {
    if (expectedStage.includes) {
      return expectedStage.includes(stage);
    } else {
      return stage === expectedStage;
    }
  })();

  return decision ? <Outlet /> : <StageRedirect />;
};

export default StageRoute;
