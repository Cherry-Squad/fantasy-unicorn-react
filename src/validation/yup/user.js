import yup from "./utils";

export const emailPasswordSchema = yup
  .object({
    email: yup.string().email().max(200).required(),
    password: yup.string().min(6).max(128).required(),
  })
  .required();

export const registrationSchema = emailPasswordSchema
  .shape({
    username: yup.string().min(3).max(25).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не одинаковы")
      .required(),
    privacyPolicyAgreement: yup
      .bool()
      .default(false)
      .oneOf([true], "Должно быть отмечено"),
  })
  .required();
