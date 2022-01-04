import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StatBadge from "./StatBadge";
import { useParamSelector } from "@utils/hooks";
import { getUserByIdSelector } from "@redux/users";

const CoinsBadge = ({ userId }) => {
  const { coins } = useParamSelector(getUserByIdSelector, { userId });
  return <StatBadge icon={AttachMoneyIcon} value={coins} />;
};

export default CoinsBadge;
