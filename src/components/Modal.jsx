import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React from "react";

export default function TransitionsModal({
  openModal,
  setOpenModal,
  children,
}) {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              backgroundColor: "background.paper",
              border: "0.2px solid #fff",
              borderRadius: "4%",
              padding: (theme) => theme.spacing(2, 4, 3),
              outline: 0,
            }}
          >
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export const makeModal =
  (WrappedComponent) =>
  ({ openModal, setOpenModal }) =>
    (
      <TransitionsModal openModal={openModal} setOpenModal={setOpenModal}>
        <WrappedComponent />
      </TransitionsModal>
    );
