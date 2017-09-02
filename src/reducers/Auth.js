import { AsyncStorage } from 'react-native';

import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/auth';

export default makeReducer((state, action) => ({
  [actions.AUTH_SET_DATA]: () => {
    state = deepUpdate(state, 'auth', {
      accessToken: action.accessToken,
      refreshToken: action.refreshToken,
      tokenType: action.tokenType,
    });

    AsyncStorage.setItem('auth', JSON.stringify({
      refreshToken: action.refreshToken,
      tokenType: action.tokenType,
    }));

    return state;
  },

  [actions.AUTH_SET_REGISTER_ERROR]: () => deepUpdate(state, 'auth', {
    registerError: action.error,
  }),

  [actions.AUTH_SET_LOGIN_ERROR]: () => deepUpdate(state, 'auth', {
    loginError: action.error,
  }),
}));
