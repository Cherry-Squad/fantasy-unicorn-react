import { logout, setTokens } from "@redux/auth";
import { loginTokenSelector } from "@redux/auth/selectors";
import {
  ACCESS_TOKEN_HEADER,
  CLIENT_HEADER,
  UID_HEADER,
  EXPIRY_HEADER,
} from "@dict/headers";

import { mainAxios } from "./utils";

const getTokensHelper = (store) => loginTokenSelector(store.getState());

const setTokensHelper = (store, { accessToken, client, uid, expiry }) =>
  store.dispatch(setTokens({ accessToken, client, uid, expiry }));

const eraseTokensHelper = (store) => store.dispatch(logout());

export const createWrappedApiInterceptor = (store) => {
  const trySetTokensToStore = (response) => {
    const accessToken = response.headers[ACCESS_TOKEN_HEADER] || null;
    const client = response.headers[CLIENT_HEADER] || null;
    const uid = response.headers[UID_HEADER] || null;
    const expiry = response.headers[EXPIRY_HEADER] || null;
    if (![accessToken, client, uid, expiry].includes(null)) {
      setTokensHelper(store, { accessToken, client, uid, expiry });
    }
  };

  const setRequestTokens = (request) => {
    const { accessToken, client, uid } = getTokensHelper(store);
    request.headers[ACCESS_TOKEN_HEADER] = accessToken;
    request.headers[CLIENT_HEADER] = client;
    request.headers[UID_HEADER] = uid;
  };

  const eraseTokensFromStore = () => {
    eraseTokensHelper(store);
  };

  mainAxios.interceptors.request.use((request) => {
    setRequestTokens(request);
    return request;
  });

  mainAxios.interceptors.response.use(
    (response) => {
      trySetTokensToStore(response);
      return response;
    },
    (error) => {
      if (error.status === 401) {
        eraseTokensFromStore();
      }
      return Promise.reject(error);
    }
  );
};
