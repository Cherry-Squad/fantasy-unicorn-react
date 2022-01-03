import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Это обязательное поле",
  },
  string: {
    min: ({ min }) => `Не менее ${min} символов`,
    max: ({ max }) => `Не более ${max} символов`,
    email: "Ожидается правильный email",
  },
});

export const emailPasswordSchema = yup
  .object({
    email: yup.string().email().max(200).required(),
    password: yup.string().min(3).max(128).required(),
  })
  .required();

export const registrationSchema = emailPasswordSchema
  .shape({
    username: yup.string().min(3).max(16).required(),
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
