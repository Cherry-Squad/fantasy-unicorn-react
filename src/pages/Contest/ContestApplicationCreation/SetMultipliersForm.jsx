import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import StockDirectionIcon from "@components/StockDirectionIcon";
import StockClickListenerContext from "@components/StockClickListenerContext";

const StockItem = ({
  contest,
  stock,
  direction,
  multipliers,
  setMultiplier,
  disableChange,
}) => {
  const onStockClick = useContext(StockClickListenerContext);

  const multiplier = multipliers[stock.id];

  const handleChange = useCallback(
    (event) => {
      if (!disableChange) setMultiplier(event.target.value, stock);
    },
    [setMultiplier, stock, disableChange]
  );

  const handleClick = useCallback(
    () => onStockClick?.(stock.name),
    [onStockClick, stock.name]
  );

  return (
    <>
      <ListItem
        secondaryAction={
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box>
              <StockDirectionIcon
                up={direction === "up"}
                down={direction === "down"}
                colored
              />
            </Box>
            <ToggleButtonGroup
              value={multiplier}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="s0.5">0.5</ToggleButton>
              <ToggleButton value="s1.0">1.0</ToggleButton>
              <ToggleButton value="s1.5">1.5</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        }
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={<>{stock.name}</>} />
        </ListItemButton>
      </ListItem>
      <Divider sx={{ mt: 1, mb: 1 }} />
    </>
  );
};

const pushOneMultiplier = (multipliers, m, stock) => {
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
        : allMultipliers.find((mult) => currentStats[mult] < maxLengths[mult]);

    out[+otherStockId] = newOtherMultiplier;
    currentStats[newOtherMultiplier]++;
  }
  return out;
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

  const setMultiplier = useCallback(
    (value, stock) =>
      setMultipliers((multipliers) =>
        pushOneMultiplier(multipliers, value, stock)
      ),
    [setMultipliers]
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
