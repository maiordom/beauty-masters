import routes from '../routes';
import { post } from '../utils/Provider';

export const userCreate = (params) => post(routes.userCreate, params)
  .then(res => (res.error ? res : {
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
    tokenType: res.token_type,
  }));

export const userLogin = (params) => post(routes.userLogin, params)
  .then(res => (res.error ? res : {
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
    tokenType: res.token_type,
  }));

export const refreshToken = (params) => post(routes.refreshToken, params)
  .then(res => (res.error ? res : {
    accessToken: res.access_token,
    refreshToken: res.refresh_token,
    tokenType: res.token_type,
  }));
