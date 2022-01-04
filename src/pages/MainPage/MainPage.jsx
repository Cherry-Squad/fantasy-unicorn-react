import { Grid, Paper } from "@mui/material";
import ContestMenu from "@pages/ContestMenu";
import React from "react";

const MainPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <ContestMenu />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainPage;
