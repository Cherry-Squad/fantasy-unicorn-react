import React from "react";
import { Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";

const FormCheckbox = ({
  name,
  control,
  controllerProps = {},
  ...fieldProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <Checkbox
          {...props}
          checked={props.value}
          onChange={(e) => props.onChange(e.target.checked)}
          {...fieldProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default FormCheckbox;
