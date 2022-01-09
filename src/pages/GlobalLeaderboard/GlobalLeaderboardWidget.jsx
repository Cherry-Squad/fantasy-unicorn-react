import BigProcess from "@components/BigProcess";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getGlobalLeaderboardThunk, getUsersByIdsSelector } from "@redux/users";
import { useLoadingRedux, useParamSelector } from "@utils/hooks";
import React from "react";

const GlobalLeaderboardWidget = () => {
  const { loading, value } = useLoadingRedux(getGlobalLeaderboardThunk, {
    enqueue: true,
  });

  const users = useParamSelector(getUsersByIdsSelector, {
    ids: value?.order || [],
  });

  return loading ? (
    <BigProcess />
  ) : (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" color="primary">
        Таблица рекордов
      </Typography>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <List>
        {users.map(({ username, coins, fantasy_points }, index) => (
          <ListItem
            key={username}
            disablePadding
            secondaryAction={
              <Typography variant="body2">
                FP: {fantasy_points} C: {coins}
              </Typography>
            }
          >
            <ListItemAvatar>{index + 1}</ListItemAvatar>
            <ListItemText primary={username} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GlobalLeaderboardWidget;
