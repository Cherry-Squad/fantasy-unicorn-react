import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useDocumentTitle } from "@utils/hooks";
import React from "react";
import ContestsWidget from "@pages/ContestsPage/ContestsWidget";

const MainPage = () => {
  useDocumentTitle("Главная");
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h4" sx={{ pt: 2, pl: 2 }} color="primary">
            Конкурсы
          </Typography>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <ContestsWidget />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainPage;
