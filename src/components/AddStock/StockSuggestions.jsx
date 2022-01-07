import { useLoadingPlain } from "@utils/hooks";
import React, { useMemo } from "react";
import { getTenExampleStocksApi } from "@api/stock";
import { LinearProgress, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

const StockSuggestions = ({ onSelect }) => {
  const { loading, value } = useLoadingPlain(getTenExampleStocksApi, {
    enqueue: true,
  });
  const suggestions = useMemo(
    () =>
      value?.data?.map(({ name }) => (
        <Link
          key={name}
          variant="body2"
          component="button"
          onClick={() => {
            onSelect(name);
          }}
        >
          {name}
        </Link>
      )) || null,
    [onSelect, value?.data]
  );

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Typography variant="body2" sx={{ flexGrow: 1 }}>
        Например:
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {suggestions}
      </Box>
    </Box>
  );
};

export default StockSuggestions;
