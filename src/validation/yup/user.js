import yup from "./utils";

const email = yup.string().email().max(200).required();

const password = yup.string().min(6).max(128).required();
const confirmPassword = yup
  .string()
  .oneOf([yup.ref("password")], "Пароли не одинаковы")
  .required();

const username = yup.string().min(3).max(25).required();

const privacyPolicyAgreement = yup
  .bool()
  .default(false)
  .oneOf([true], "Должно быть отмечено");

export const emailPasswordSchema = yup
  .object({
    email,
    password,
  })
  .required();

export const registrationSchema = emailPasswordSchema
  .shape({
    username,
    confirmPassword,
    privacyPolicyAgreement,
  })
  .required();

export const recoverPasswordSchema = yup.object({ email }).required();

export const changePasswordSchema = yup
  .object({ password, confirmPassword })
  .required();
