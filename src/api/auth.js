import { basicAxios, mainAxios } from "./utils";

export const signInApi = (email, password) =>
  basicAxios().post("/auth/sign_in", {
    email,
    password,
  });

export const signUpApi = ({ username, email, password }) =>
  basicAxios().post("/auth/", {
    username,
    email,
    password,
  });

export const signOutApi = () => mainAxios.delete("/auth/sign_out");

export const deleteSelfUserApi = () => mainAxios.delete("/auth/");

export const getSelfUserApi = () => mainAxios.get("/auth/validate_token");

export const resendConfirmationMailApi = (email) =>
  basicAxios().post("/auth/confirmation", { email });

export const sendRecoverPasswordEmailApi = ({ email }) =>
  basicAxios().post("/auth/password", { email });

export const changePasswordWithTokenApi = ({
  password,
  reset_password_token,
}) =>
  basicAxios().put("/auth/password", {
    password,
    password_confirmation: password,
    reset_password_token,
  });

export const changePasswordApi = ({ password, reset_password_token }) =>
  mainAxios.put("/auth/password", {
    password,
    reset_password_token,
  });
