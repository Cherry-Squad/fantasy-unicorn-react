import { logout, setTokens } from "@redux/auth";
import { loginTokensSelector } from "@redux/auth/selectors";

import { mainAxios } from "./utils";

const getTokensHelper = (store) => loginTokensSelector(store.getState());

const setTokensHelper = (store, { accessToken, client, uid }) =>
  store.dispatch(setTokens({ accessToken, client, uid }));

const eraseTokensHelper = (store) => store.dispatch(logout());

export const createWrappedApiInterceptor = (store) => {
  const trySetTokensToStore = (response) => {
    const accessToken = response.headers["Access-Token"] || null;
    const client = response.headers["Client"] || null;
    const uid = response.headers["UID"] || null;
    if (![accessToken, client, uid].includes(null)) {
      setTokensHelper(store, { accessToken, client, uid });
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
