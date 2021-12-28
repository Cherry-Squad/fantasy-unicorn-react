import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const FormTextField = ({
  name,
  control,
  controllerProps = {},
  ...fieldProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <TextField {...field} {...fieldProps}></TextField>}
      {...controllerProps}
    />
  );
};

export default FormTextField;
