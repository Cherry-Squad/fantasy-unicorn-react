import { Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ContestDirectionStrategyIcon from "./ContestDirectionStrategyIcon";
import ContestInvertedStockPricesIcon from "./ContestInvertedStockPricesIcon";
import ContestMultipliersIcon from "./ContestMultipliersIcon";
import ContestStatusIcon from "./ContestStatusIcon";
import ContestUseBriefcaseOnlyIcon from "./ContestUseBriefcaseOnlyIcon";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CoinsEntryFeeBadge from "./CoinsEntryFeeBadge";
import FantasyPointsThresholdBadge from "./FantasyPointsThresholdBadge";

const ContestCard = ({ contest }) => {
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

  return (
    <Paper
      elevation={2}
      sx={{
        width: "240px",
        height: "180px",
        p: 3,
        mr: 3,
      }}
    >
      <Grid container>
        <Grid item sm={9} sx={{ alignSelf: "flex-end" }}>
          <Typography sx={{ overflowWrap: "break-word" }} variant="body">
            {"#" + id}
          </Typography>
        </Grid>
        <Grid
          item
          sm={3}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <ContestStatusIcon status={status} />
        </Grid>
        <Grid item sm={12} sx={{ mt: 1.5, mb: 1.5 }}>
          <Divider />
        </Grid>
        <Grid
          item
          sm={12}
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <ContestUseBriefcaseOnlyIcon useBriefcaseOnly={useBriefcaseOnly} />
          <ContestDirectionStrategyIcon
            directionStrategy={directionStrategy}
            fixedDirectionUp={fixedDirectionUp}
          />
          <ContestMultipliersIcon
            useDisabledMultipliers={useDisabledMultipliers}
          />
          <ContestInvertedStockPricesIcon
            useInvertedStockPrices={useInvertedStockPrices}
          />
        </Grid>
        <Grid item sm={12} sx={{ mt: 1.5, mb: 1.5 }}>
          <Divider />
        </Grid>
        <Grid item sm={6}>
          <CoinsEntryFeeBadge value={coinsEntryFee} />
        </Grid>
        <Grid item sm={6}>
          <FantasyPointsThresholdBadge value={maxFantasyPointsThreshold} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContestCard;
