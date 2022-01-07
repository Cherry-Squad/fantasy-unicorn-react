import { Divider, List, ListItem, ListItemText } from "@mui/material";
import React, { useMemo } from "react";

const StocksList = ({ size, content, ...props }) => {
  const mappedContent = useMemo(
    () =>
      content
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ name }) => (
          <React.Fragment key={name}>
            <ListItem disablePadding>
              <ListItemText primary={name} />
            </ListItem>
            <Divider sx={{ mt: 1, mb: 1 }} />
          </React.Fragment>
        )),
    [content]
  );
  const dummyContent = useMemo(
    () =>
      Array(size)
        .fill()
        .map((_, i) => i + 1)
        // .filter((i) => i >= content.size)
        .filter((i) => i > content.length)
        .map((i) => (
          <React.Fragment key={i}>
            <ListItem key={i} disablePadding>
              <ListItemText secondary={`Слот для акции #${i}`} />
            </ListItem>
            <Divider sx={{ mt: 1, mb: 1 }} />
          </React.Fragment>
        )),
    [size, content]
  );
  return (
    <List {...props}>
      {mappedContent}
      {dummyContent}
    </List>
  );
};

export default StocksList;
