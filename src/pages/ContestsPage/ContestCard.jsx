import { Divider, Grid, Link, Paper, Typography } from "@mui/material";
import React, { useCallback } from "react";
import CoinsEntryFeeBadge from "./CoinsEntryFeeBadge";
import FantasyPointsThresholdBadge from "./FantasyPointsThresholdBadge";
import ContestModsIconBar from "@components/ContestModsIconBar";
import { useNavigate, Link as RenderLink } from "react-router-dom";
import ContestStatusIcon from "@pages/Contest/ContestStatusIcon";
import { StatusEnum } from "@dict/contest";
import VisibleTimer from "@components/VisibleTimer";

const ContestCard = ({ contest }) => {
  const {
    id,
    status,
    reg_ending_at: regEndingAt,
    summarizing_at: summarizingAt,
    coins_entry_fee: coinsEntryFee,
    max_fantasy_points_threshold: maxFantasyPointsThreshold,
  } = contest;

  return (
    <Paper
      elevation={2}
      sx={{
        width: "240px",
        minWidth: "240px",
        height: "180px",
        p: 3,
        mr: 3,
      }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <Link
            component={RenderLink}
            to={`/contest/${id}`}
            sx={{ flexGrow: 1 }}
          >
            <Typography sx={{ overflowWrap: "break-word" }} variant="body">
              {"#" + id}
            </Typography>
          </Link>
          {status !== StatusEnum.FINISHED && (
            <VisibleTimer
              targetDate={
                status === StatusEnum.CREATED
                  ? Date.parse(regEndingAt)
                  : Date.parse(summarizingAt)
              }
            />
          )}
          <ContestStatusIcon status={status} />
        </Grid>
        <Grid item xs={12} sx={{ mt: 1.5, mb: 1.5 }}>
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <ContestModsIconBar showAll={false} contest={contest} />
        </Grid>
        <Grid item xs={12} sx={{ mt: 1.5, mb: 1.5 }}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <CoinsEntryFeeBadge value={coinsEntryFee} />
        </Grid>
        <Grid item xs={6}>
          <FantasyPointsThresholdBadge value={maxFantasyPointsThreshold} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContestCard;
