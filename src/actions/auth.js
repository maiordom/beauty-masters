import * as AuthService from '../services/auth';
import actions from '../constants/auth';

import { setActivityIndicator } from './common';

const handleAuth = (res, dispatch, errorType) => {
  dispatch(setActivityIndicator(false));

  if (res.error) {
    dispatch({
      type: errorType,
      ...res,
    });
  } else {
    dispatch({
      type: actions.AUTH_SET_DATA,
      ...res,
    });
    return { result: 'success' };
  }

  return { result: 'error' };
};

export const userCreate = ({ email, password, roleId = 2 }) => (dispatch) => {
  dispatch(setActivityIndicator(true));

  const params = {
    data: {
      attributes: { email, password, role_id: roleId },
    },
  };

  return AuthService.userCreate(params)
    .then((res) => (handleAuth(res, dispatch, actions.AUTH_SET_REGISTER_ERROR)))
    .catch(() => dispatch(setActivityIndicator(false)));
};

export const userLogin = ({ username, password }) => (dispatch) => {
  dispatch(setActivityIndicator(true));

  const params = {
    data: {
      attributes: { username, password },
    },
  };

  return AuthService.userLogin(params)
    .then((res) => handleAuth(res, dispatch, actions.AUTH_SET_LOGIN_ERROR))
    .catch(() => dispatch(setActivityIndicator(false)));
};
