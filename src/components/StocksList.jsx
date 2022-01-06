import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { contest } from "@validation/normalizr";
import React, { useMemo } from "react";

const StocksList = ({ size, content, onAdd, ...props }) => {
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
        .map((i) => (
          <React.Fragment key={i}>
            <ListItem key={i} disablePadding>
              <ListItemText primary={"Слот для акции"} />
            </ListItem>
            <Divider sx={{ mt: 1, mb: 1 }} />
          </React.Fragment>
        )),
    [size, content.length]
  );
  console.log(dummyContent);
  return (
    <List {...props}>
      {mappedContent}
      {dummyContent}
    </List>
  );
};

export default StocksList;
