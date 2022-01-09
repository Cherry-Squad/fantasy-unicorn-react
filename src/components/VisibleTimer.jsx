import { Typography } from "@mui/material";
import { secondsToDhms } from "@utils/date";
import React, { useEffect, useMemo, useState } from "react";
import { useIntervalWhen } from "rooks";

const calculateDelta = (now, target) => Math.max(0, (target - now) / 1000);

const calculateDeltaFromNow = (target) => calculateDelta(new Date(), target);

const VisibleTimer = ({ targetDate, ...props }) => {
  const [secondsLeft, setSecondsLeft] = useState(
    calculateDeltaFromNow(targetDate)
  );
  useIntervalWhen(
    () => setSecondsLeft(calculateDeltaFromNow(targetDate)),
    1000,
    secondsLeft > 0
  );

  useEffect(
    () => setSecondsLeft(calculateDeltaFromNow(targetDate)),
    [targetDate]
  );

  const formatted = useMemo(() => secondsToDhms(secondsLeft), [secondsLeft]);

  return <Typography {...props}>{formatted}</Typography>;
};

export default VisibleTimer;
