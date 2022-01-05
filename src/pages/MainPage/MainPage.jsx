import { Grid, Paper } from "@mui/material";
import { useDocumentTitle } from "@utils/hooks";
import React from "react";
import ContestsWidget from "@pages/ContestsPage/ContestsWidget";

const MainPage = () => {
  useDocumentTitle("Главная");
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <ContestsWidget />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainPage;
