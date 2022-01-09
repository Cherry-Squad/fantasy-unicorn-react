import React from "react";
import { useLoadingRedux, useParamSelector } from "@utils/hooks";
import { getApplicationsByContestIdSelector } from "@redux/contestApplications";
import { getUserByIdSelector } from "@redux/users";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { addSign } from "@utils/format";

const ScoreItem = ({ application }) => {
  const {
    final_position: finalPosition,
    coins_delta: coinsDelta,
    fantasy_points_delta: fantasyPointsDelta,
    user_id: userId,
  } = application;

  const user = useParamSelector(getUserByIdSelector, { userId });

  return (
    <ListItem
      secondaryAction={
        <Box>
          {!!finalPosition && (
            <Typography variant="body2">
              ΔFP: {addSign(fantasyPointsDelta)}, ΔC: {addSign(coinsDelta)}
            </Typography>
          )}
        </Box>
      }
    >
      <ListItemAvatar>{finalPosition}</ListItemAvatar>
      <ListItemText primary={user.username} />
    </ListItem>
  );
};

const ContestScoreboardWidget = ({ contest }) => {
  const applications = useParamSelector(getApplicationsByContestIdSelector, {
    contestId: contest.id,
  });

  return (
    <List>
      {applications
        .sort((a, b) =>
          !!a && !!b ? +a.final_position - +b.final_position : +a.id - +b.id
        )
        .map((app) => (
          <ScoreItem key={app.id} application={app} />
        ))}
    </List>
  );
};

export default ContestScoreboardWidget;
