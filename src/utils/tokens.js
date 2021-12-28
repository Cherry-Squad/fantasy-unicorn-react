import { setTokens } from "@redux/auth/actions";
import { load, save, remove } from "./localStorage";

export const localStorageSet = (store, tokensBag) => {
  const { accessToken, client, uid, expiry } = tokensBag;

  save("token.value", accessToken);
  save("token.client", client);
  save("token.uid", uid);
  save("token.expiry", expiry);

  store.dispatch(setTokens(tokensBag));
};

export const localStorageLoad = () => {
  const accessToken = load("token.value");
  const client = load("token.client");
  const uid = load("token.uid");
  const expiry = load("token.expiry");

  if ([accessToken, client, uid, expiry].includes(null)) {
    return {};
  }

  return {
    accessToken,
    client,
    uid,
    expiry,
  };
};

export const localStorageErase = () => {
  remove("token.value");
  remove("token.client");
  remove("token.uid");
  remove("token.expiry");
};
