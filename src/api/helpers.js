import { logout, setTokens } from "@redux/auth";
import { loginTokenSelector } from "@redux/auth/selectors";

import { mainAxios } from "./utils";

const getTokensHelper = (store) => loginTokenSelector(store.getState());

const setTokensHelper = (store, { accessToken, client, uid, expiry }) =>
  store.dispatch(setTokens({ accessToken, client, uid, expiry }));

const eraseTokensHelper = (store) => store.dispatch(logout());

export const createWrappedApiInterceptor = (store) => {
  const trySetTokensToStore = (response) => {
    const accessToken = response.headers["access-token"] || null;
    const client = response.headers["client"] || null;
    const uid = response.headers["uid"] || null;
    const expiry = response.headers["expiry"] || null;
    if (![accessToken, client, uid, expiry].includes(null)) {
      setTokensHelper(store, { accessToken, client, uid, expiry });
    }
  };

  const setRequestTokens = (request) => {
    const { accessToken, client, uid } = getTokensHelper(store);
    request.headers["Access-Token"] = accessToken;
    request.headers["Client"] = client;
    request.headers["UID"] = uid;
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
