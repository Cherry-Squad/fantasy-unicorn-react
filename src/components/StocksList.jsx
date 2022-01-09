import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { stock } from "@validation/normalizr";
import React, { useCallback, useContext, useMemo } from "react";
import StockClickListenerContext from "./StockClickListenerContext";

const StockItem = ({ stock }) => {
  const { name } = stock;
  const onStockClick = useContext(StockClickListenerContext);

  const handleClick = useCallback(
    () => onStockClick?.(stock.name),
    [onStockClick, stock.name]
  );

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

const StocksList = ({ size, content, ...props }) => {
  const mappedContent = useMemo(
    () =>
      content
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((stock) => (
          <React.Fragment key={stock.name}>
            <StockItem stock={stock} />
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
