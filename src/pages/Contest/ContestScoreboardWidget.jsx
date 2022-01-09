import React from "react";
import { useLoadingRedux, useParamSelector } from "@utils/hooks";
import { getApplicationsByContestIdSelector } from "@redux/contestApplications";
import { getUserByIdSelector } from "@redux/users";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const addSign = (num) => {
  let n = +num;
  if (n <= 0) {
    return n;
  } else {
    return `+${n}`;
  }
};

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
              FP: {addSign(fantasyPointsDelta)}, C: {addSign(coinsDelta)}
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
          !!a && !!b ? +a.final_position < +b.final_position : +a.id < +b.id
        )
        .map((app) => (
          <ScoreItem application={app} />
        ))}
    </List>
  );
};

export default ContestScoreboardWidget;
