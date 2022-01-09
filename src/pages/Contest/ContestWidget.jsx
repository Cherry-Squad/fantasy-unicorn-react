import { StatusRu } from "@dict/contest";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ContestStatusIcon from "./ContestStatusIcon";
import ContestModsIconBar from "@components/ContestModsIconBar";
import RegisterToContestBar from "./RegisterToContestBar";
import { getSelfUserApplicationByContestIdSelector } from "@redux/contestApplications";
import { useParamSelector } from "@utils/hooks";
import ApplicationWidget from "./ApplicationWidget";

const ContestWidget = ({ contest }) => {
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

  const userApplication = useParamSelector(
    getSelfUserApplicationByContestIdSelector,
    { contestId: contest.id }
  );

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          #{id}
        </Typography>
        <Typography variant="body1">{StatusRu[status]}</Typography>
        <ContestStatusIcon status={status} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption">
          Окончание регистрации: {new Date(regEndingAt).toLocaleString("ru")}
        </Typography>
        <Typography variant="caption">
          Подведение итогов: {new Date(summarizingAt).toLocaleString("ru")}
        </Typography>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6">Правила конкурса</Typography>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <ContestModsIconBar showAll contest={contest} />
        </Box>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />
      {!userApplication ? (
        <RegisterToContestBar contest={contest} notRegistered />
      ) : (
        <>
          <Typography variant="h6">Ваша ставка</Typography>
          <ApplicationWidget contest={contest} application={userApplication} />
        </>
      )}
    </Box>
  );
};

export default ContestWidget;
