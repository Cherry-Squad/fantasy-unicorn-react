import React from "react";
import { CssBaseline, Grid, Paper } from "@mui/material";
import { useDocumentTitle } from "@utils/hooks";

export default function ImageWidgetPage({ title, children }) {
  useDocumentTitle(title);
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        xl={9}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (theme) =>
            theme.palette.type === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        xl={3}
        elevation={6}
        component={Paper}
        square
      >
        {children}
      </Grid>
    </Grid>
  );
}

export const makePage = (WrappedComponent, title) => () => {
  return (
    <ImageWidgetPage title={title}>
      <WrappedComponent />
    </ImageWidgetPage>
  );
};
