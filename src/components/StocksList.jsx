import { Divider, List, ListItem, ListItemText } from "@mui/material";
import React, { useMemo } from "react";

const StocksList = ({ size, content, ...props }) => {
  const mappedContent = useMemo(
    () =>
      content.map(({ name }) => (
        <React.Fragment key={name}>
          <ListItem disablePadding>
            <ListItemText primary={name} />
          </ListItem>
        </React.Fragment>
      )),
    [content]
  );
  const dummyContent = useMemo(
    () =>
      Array(size - content.length)
        .fill()
        .map((_, i) => (
          <React.Fragment key={i}>
            <ListItem key={i} disablePadding>
              <ListItemText primary={"Слот для акции"} />
            </ListItem>
            <Divider sx={{ mt: 1, mb: 1 }} />
          </React.Fragment>
        )),
    [size, content.length]
  );
  return (
    <List {...props}>
      {mappedContent}
      {dummyContent}
    </List>
  );
};

export default StocksList;
