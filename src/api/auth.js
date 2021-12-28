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

export const getSelfUserApi = () => mainAxios.get("/auth/");
