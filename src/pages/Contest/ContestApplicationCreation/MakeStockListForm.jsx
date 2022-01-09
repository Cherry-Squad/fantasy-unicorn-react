import { AddStockModal } from "@components/AddStock";
import BriefcaseWidget from "@components/BriefcaseWidget";
import StocksList from "@components/StocksList";
import { BRIEFCASE_STOCK_COUNT } from "@dict/briefcase";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { userIdSelector } from "@redux/auth";
import { getBriefcaseByUserIdSelector } from "@redux/briefcases";
import { getStocksByIdsSelector } from "@redux/stocks";
import { useParamSelector } from "@utils/hooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

const BriefcaseBasedStockListForm = ({ setStocks }) => {
  const userId = useSelector(userIdSelector);
  const briefcase = useParamSelector(getBriefcaseByUserIdSelector, { userId });
  const stocks = useParamSelector(getStocksByIdsSelector, {
    ids: briefcase?.stocks || [],
  });

  useEffect(() => {
    if (stocks) setStocks(stocks);
  }, [setStocks, JSON.stringify(stocks)]);

  return (
    <>
      <Typography variant="h6">Ваш портфель</Typography>
      <BriefcaseWidget />
    </>
  );
};

const FreeStockListForm = ({ stocks, setStocks }) => {
  const [openModal, setOpenModal] = useState(false);

  const onAdd = useCallback(
    ({ id, name }) => {
      setStocks([...stocks, { id, name }]);
      setOpenModal(false);
    },
    [setStocks, stocks, setOpenModal]
  );

  const stockNames = useMemo(
    () => stocks?.map(({ name }) => name) || [],
    [stocks]
  );

  const onClick = useCallback(() => setOpenModal(true), [setOpenModal]);

  const canAdd = stocks && stocks.length < BRIEFCASE_STOCK_COUNT;

  return (
    <Box>
      <Typography variant="h6">Выберите акции для участия</Typography>
      <IconButton disabled={!canAdd} onClick={onClick}>
        <AddIcon />
      </IconButton>
      <AddStockModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onAdd={onAdd}
        stopList={stockNames}
      />
      <Divider sx={{ mt: 1, mb: 1 }} />
      <StocksList size={BRIEFCASE_STOCK_COUNT} content={stocks} />
    </Box>
  );
};

const MakeStockListForm = ({ contest, stocks, setStocks }) => {
  const { use_briefcase_only: useBriefcaseOnly } = contest;

  const useBriefcaseForm = useBriefcaseOnly;

  return (
    <>
      {useBriefcaseForm ? (
        <BriefcaseBasedStockListForm setStocks={setStocks} />
      ) : (
        <FreeStockListForm stocks={stocks} setStocks={setStocks} />
      )}
    </>
  );
};

export default MakeStockListForm;
