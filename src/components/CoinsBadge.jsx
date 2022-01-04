import React from "react";

import SavingsIcon from "@mui/icons-material/Savings";
import StatBadge from "./StatBadge";
import { useParamSelector } from "@utils/hooks";
import { getUserByIdSelector } from "@redux/users";

const CoinsBadge = ({ userId }) => {
  const { coins } = useParamSelector(getUserByIdSelector, { userId });
  return <StatBadge icon={SavingsIcon} value={coins} />;
};

export default CoinsBadge;
