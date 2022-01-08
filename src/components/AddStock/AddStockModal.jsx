import Modal from "@components/Modal";

import AddStockWidget from "./AddStockWidget";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback, useRef } from "react";
import { Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";

const AddStockModal = ({ openModal, setOpenModal, onAdd, stopList }) => {
  const handleClose = useCallback(() => setOpenModal(false), [setOpenModal]);
  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      sx={{
        width: "80vw",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ mt: 1, mb: 2, flexGrow: 1 }}
        >
          Добавление акции
        </Typography>
        <Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <AddStockWidget onAdd={onAdd} sx={{ flexGrow: 1 }} stopList={stopList} />
    </Modal>
  );
};

export default AddStockModal;
