import { Typography } from "@mui/material";
import { secondsToDhms } from "@utils/date";
import React, { useMemo, useState } from "react";
import { useIntervalWhen } from "rooks";

const calculateDelta = (now, target) => Math.max(0, (target - now) / 1000);

const VisibleTimer = ({ targetDate, ...props }) => {
  const [secondsLeft, setSecondsLeft] = useState(
    calculateDelta(new Date(), targetDate)
  );
  useIntervalWhen(
    () => setSecondsLeft(calculateDelta(new Date(), targetDate)),
    1000,
    secondsLeft > 0
  );

  const formatted = useMemo(() => secondsToDhms(secondsLeft), [secondsLeft]);

  return <Typography {...props}>{formatted}</Typography>;
};

export default VisibleTimer;
