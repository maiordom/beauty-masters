import * as AuthService from '../services/Auth';
import actions from '../constants/Auth';
import profileActions from '../constants/Profile';

import { setActivityIndicator } from './Common';

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

export const userCreate = ({ email, password, roleId = 3 }) => (dispatch) => {
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

export const logout = () => (dispatch) => {
  dispatch({
    type: actions.AUTH_SET_DATA,
    payload: {
      accessToken: null,
      refreshToken: null,
      tokenType: null,
    },
  });

  dispatch({
    type: profileActions.PROFILE_DATA_SET,
    payload: {
      email: null,
      masterCards: [],
      userId: null,
    },
  });
};

export const refreshToken = (token) => (dispatch) => {
  const params = {
    data: {
      attributes: {
        refresh_token: token,
      },
    },
  };

  return AuthService.refreshToken(params).then(res => {
    dispatch({
      type: actions.AUTH_SET_DATA,
      ...res,
    });
  });
};
