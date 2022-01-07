import * as yup from "yup";

export const addStockSchema = yup
  .object({
    name: yup.string().min(1).max(15).required(),
  })
  .required();
