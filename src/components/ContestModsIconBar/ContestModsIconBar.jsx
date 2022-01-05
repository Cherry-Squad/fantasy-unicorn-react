import React from "react";
import ContestDirectionStrategyIcon from "./ContestDirectionStrategyIcon";
import ContestInvertedStockPricesIcon from "./ContestInvertedStockPricesIcon";
import ContestMultipliersIcon from "./ContestMultipliersIcon";
import ContestUseBriefcaseOnlyIcon from "./ContestUseBriefcaseOnlyIcon";

const ContestModsIconBar = ({ showAll, contest }) => {
  const {
    use_briefcase_only: useBriefcaseOnly,
    direction_strategy: directionStrategy,
    fixed_direction_up: fixedDirectionUp,
    use_disabled_multipliers: useDisabledMultipliers,
    use_inverted_stock_prices: useInvertedStockPrices,
  } = contest;

  return (
    <>
      <ContestUseBriefcaseOnlyIcon useBriefcaseOnly={useBriefcaseOnly} />
      <ContestDirectionStrategyIcon
        directionStrategy={directionStrategy}
        fixedDirectionUp={fixedDirectionUp}
      />
      {(useDisabledMultipliers || showAll) && (
        <ContestMultipliersIcon
          useDisabledMultipliers={useDisabledMultipliers}
        />
      )}
      {(useInvertedStockPrices || showAll) && (
        <ContestInvertedStockPricesIcon
          useInvertedStockPrices={useInvertedStockPrices}
        />
      )}
    </>
  );
};

export default ContestModsIconBar;
