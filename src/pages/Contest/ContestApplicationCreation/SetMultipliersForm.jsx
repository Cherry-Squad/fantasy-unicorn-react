import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useMemo } from "react";

const StockItem = ({
  contest,
  stock,
  direction,
  multipliers,
  setMultiplier,
  disableChange,
}) => {
  const multiplier = multipliers[stock.id];

  const handleChange = useCallback(
    (event) => {
      if (!disableChange) setMultiplier(event.target.value, stock);
    },
    [setMultiplier, stock, disableChange]
  );

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <ToggleButtonGroup
              value={multiplier}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="s0.5">0.5</ToggleButton>
              <ToggleButton value="s1.0">1.0</ToggleButton>
              <ToggleButton value="s1.5">1.5</ToggleButton>
            </ToggleButtonGroup>
          </>
        }
      >
        <ListItemText primary={stock.name} />
      </ListItem>
      <Divider sx={{ mt: 1, mb: 1 }} />
    </>
  );
};

const SetMultipliersForm = ({
  contest,
  stocks,
  directions,
  multipliers,
  setMultipliers,
}) => {
  const {
    id,
    status,
    reg_ending_at: regEndingAt,
    summarizing_at: summarizingAt,
    coins_entry_fee: coinsEntryFee,
    max_fantasy_points_threshold: maxFantasyPointsThreshold,
    use_briefcase_only: useBriefcaseOnly,
    direction_strategy: directionStrategy,
    fixed_direction_up: fixedDirectionUp,
    use_disabled_multipliers: useDisabledMultipliers,
    use_inverted_stock_prices: useInvertedStockPrices,
    created_at: createdAt,
  } = contest;

  const setAllMultipliers = useCallback(
    (value) =>
      setMultipliers(Object.fromEntries(stocks.map(({ id }) => [id, value]))),
    [setMultipliers, stocks]
  );

  // const pushOneMultiplier = useCallback((multipliers, m, stock) => {
  //   const stats = Object.entries(multipliers).reduce(
  //     (acc, [id, v]) => {
  //       if (+id !== +stock.id) acc[v].push(id);
  //       return acc;
  //     },
  //     {
  //       "s0.5": [],
  //       "s1.0": [],
  //       "s1.5": [],
  //     }
  //   );
  //   const maxLengths = { "s0.5": 3, "s1.0": 4, "s1.5": 3 };
  //   if (stats[m].length >= maxLengths[m]) {
  //     const order = [
  //       ...new Set(Object.keys(stats)),
  //       ...new Set(Object.keys(stats)),
  //     ];
  //     const bag = stats[m].splice(0, stats[m].length - maxLengths[m] + 1);
  //     for (let i = 1; i < order.length; i++) {
  //       const key = order[i];
  //       if (key === m) continue;
  //       const stat = stats[key].length;
  //       if (stat > maxLengths[key]) {
  //         bag.push(...stats[key].splice(0, stat - maxLengths[key] + 1));
  //       } else {
  //         stats[key].push(...bag.splice(0, maxLengths[key] - stat));
  //       }
  //     }
  //     return {
  //       ...Object.fromEntries(
  //         Object.entries(stats).flatMap(([key, ids]) =>
  //           ids.map((id) => [+id, key])
  //         )
  //       ),
  //       [stock.id]: m,
  //     };
  //   } else {
  //     return { ...multipliers, [stock.id]: m };
  //   }
  // }, []);

  const pushOneMultiplier = useCallback((multipliers, m, stock) => {
    const maxLengths = { "s0.5": 3, "s1.0": 4, "s1.5": 3 };
    const out = { [stock.id]: m };
    const currentStats = { "s0.5": 0, "s1.0": 0, "s1.5": 0 };
    currentStats[m] = 1;
    const allMultipliers = Object.keys(maxLengths);
    for (const otherStockId in multipliers) {
      if (+otherStockId === +stock.id) continue;

      const oldOtherMultiplier = multipliers[otherStockId];

      const newOtherMultiplier =
        currentStats[oldOtherMultiplier] < maxLengths[oldOtherMultiplier]
          ? oldOtherMultiplier
          : allMultipliers.find(
              (mult) => currentStats[mult] < maxLengths[mult]
            );

      out[+otherStockId] = newOtherMultiplier;
      currentStats[newOtherMultiplier]++;
    }
    return out;
  }, []);

  const setMultiplier = useCallback(
    (value, stock) =>
      setMultipliers((multipliers) =>
        pushOneMultiplier(multipliers, value, stock)
      ),
    [pushOneMultiplier, setMultipliers]
  );

  useEffect(() => {
    if (useDisabledMultipliers) setAllMultipliers("s1.0");
  }, [useDisabledMultipliers, setAllMultipliers]);

  const rendered = useMemo(
    () =>
      stocks.map((stock) => (
        <StockItem
          key={stock.id}
          contest={contest}
          stock={stock}
          direction={directions[stock.id]}
          multipliers={multipliers}
          setMultiplier={setMultiplier}
          disableChange={useDisabledMultipliers}
        />
      )),
    [
      contest,
      stocks,
      directions,
      multipliers,
      setMultiplier,
      useDisabledMultipliers,
    ]
  );

  return (
    <Box>
      <Typography variant="body2">
        Множители отвечают за то, сколько вы получите очков за успешное
        предсказание
      </Typography>
      <List>{rendered}</List>
    </Box>
  );
};

export default SetMultipliersForm;
