import React from "react";

import StatBadge from "./StatBadge";
import { useParamSelector } from "@utils/hooks";
import { getUserByIdSelector } from "@redux/users";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const PointsBadge = ({ userId }) => {
  const { fantasy_points: fantasyPoints } = useParamSelector(
    getUserByIdSelector,
    { userId }
  );
  return <StatBadge icon={BusinessCenterIcon} value={fantasyPoints} />;
};

export default PointsBadge;
