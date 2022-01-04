import { load, save, remove } from "./localStorage";

const tokenValueKey = "token.value";
const tokenClientKey = "token.client";
const tokenUidKey = "token.uid";
const tokenExpiryKey = "token.expiry";
const userIdKey = "user.id";

export const localStorageSet = (authBag) => {
  const {
    token: { accessToken, client, uid, expiry },
    user: { id },
  } = authBag;

  save(tokenValueKey, accessToken);
  save(tokenClientKey, client);
  save(tokenUidKey, uid);
  save(tokenExpiryKey, expiry);
  save(userIdKey, id);
};

export const localStorageLoad = () => {
  const accessToken = load(tokenValueKey);
  const client = load(tokenClientKey);
  const uid = load(tokenUidKey);
  const expiry = load(tokenExpiryKey);
  const id = load(userIdKey);

  if ([accessToken, client, uid, expiry, id].includes(null)) {
    return {
      token: {
        accessToken: null,
        client: null,
        uid: null,
        expiry: null,
      },
      user: {
        id: null,
      },
    };
  }

  return {
    token: {
      accessToken,
      client,
      uid,
      expiry,
    },
    user: {
      id,
    },
  };
};

export const localStorageErase = () => {
  remove(tokenValueKey);
  remove(tokenClientKey);
  remove(tokenUidKey);
  remove(tokenExpiryKey);
  remove(userIdKey);
};
