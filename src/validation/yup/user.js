import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Это обязательное поле",
  },
});

export const emailPasswordSchema = yup.object().shape({
  email: yup.string().email().max(200).required(),
  password: yup.string().min(3).max(128).required(),
});

export const registrationSchema = emailPasswordSchema.shape({
  username: yup.string().min(3).max(16).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не одинаковы")
    .required(),
  privacyPolicyAgreement: yup
    .bool()
    .default(false)
    .oneOf([true], "Должно быть отмечено"),
});
