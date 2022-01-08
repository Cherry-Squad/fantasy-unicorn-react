import { Divider, List, ListItem, ListItemText, Radio } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import StockDirectionIcon from "@components/StockDirectionIcon";
import { DirectionStrategyEnum } from "@dict/contest";

const StockItem = ({
  contest,
  stock,
  directions,
  setDirection,
  disableChange,
}) => {
  const handleChange = useCallback(
    (event) => {
      if (!disableChange) setDirection(event.target.value, stock);
    },
    [setDirection, stock, disableChange]
  );
  const direction = directions[stock.id];

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Radio
              checked={direction === "down"}
              onChange={handleChange}
              value="down"
              icon={<StockDirectionIcon down />}
              checkedIcon={<StockDirectionIcon down colored />}
            />
            <Radio
              checked={direction === "up"}
              onChange={handleChange}
              value="up"
              icon={<StockDirectionIcon up />}
              checkedIcon={<StockDirectionIcon up colored />}
            />
          </>
        }
      >
        <ListItemText primary={stock.name} />
      </ListItem>
      <Divider sx={{ mt: 1, mb: 1 }} />
    </>
  );
};

const SetDirectionsForm = ({ contest, stocks, directions, setDirections }) => {
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

  const setAllDirection = useCallback(
    (value) =>
      setDirections(Object.fromEntries(stocks.map(({ id }) => [id, value]))),
    [setDirections, stocks]
  );

  const setDirection = useCallback(
    (value, stock) =>
      setDirections((directions) =>
        directionStrategy === DirectionStrategyEnum.SINGLE_PER_USER
          ? setAllDirection(value)
          : { ...directions, [stock.id]: value }
      ),
    [setDirections, setAllDirection, directionStrategy]
  );

  useEffect(() => {
    if (directionStrategy === DirectionStrategyEnum.FIXED) {
      setAllDirection(fixedDirectionUp ? "up" : "down");
    }
  }, [setAllDirection, directionStrategy, fixedDirectionUp]);

  const rendered = useMemo(
    () =>
      stocks.map((stock) => (
        <StockItem
          key={stock.id}
          contest={contest}
          stock={stock}
          directions={directions}
          setDirection={setDirection}
          disableChange={directionStrategy === DirectionStrategyEnum.FIXED}
        />
      )),
    [stocks, setDirection, contest, directions, directionStrategy]
  );

  return <List>{rendered}</List>;
};

export default SetDirectionsForm;
