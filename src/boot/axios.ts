import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { IDictionary } from 'src/types';
import { userStore } from 'src/modules';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
// let _baseURL = 'https://ustora.expresscuba.com';
let _baseURL = 'http://localhost:8000';
if (!process.env.DEV) {
  const location = window.location;
  if (location.hostname !== 'localhost') {
    _baseURL = location.origin;
  }
}
export const baseURL = _baseURL;

const api = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 30000,
  timeoutErrorMessage: 'Error en la red',
});

export default boot(({ app }) => {
  userStore.load();
  console.log({ profile: userStore.profile, apiToken: userStore.apiToken });
  /**
   * Api request Interceptor
   */
  api.interceptors.request.use((_request) => {
    /* Append content type header if its not present */
    if (!(_request.headers as IDictionary)['Content-Type']) {
      (_request.headers as IDictionary)['Content-Type'] = 'application/json';
    }

    /* Check if authorization is set */
    if (!(_request.headers as IDictionary)['Authorization']) {
      /* Check if the user is authenticated to send Bearer token */
      const token = userStore.apiToken;
      if (token && token.length > 0) {
        (_request.headers as IDictionary).Authorization = 'Bearer ' + token;
      } else {
        /* Send the application authentication as Bearer token */
        (_request.headers as IDictionary).Authorization = 'Bearer ApiToken';
      }
    }
    return _request;
  });

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
