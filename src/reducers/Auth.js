import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/auth';

export default makeReducer((state, action) => ({
  [actions.AUTH_SET_DATA]: () => deepUpdate(state, 'auth', {
    accessToken: action.accessToken,
    refreshToken: actions.refreshToken,
    tokenType: action.tokenType,
  }),

  [actions.AUTH_SET_REGISTER_ERROR]: () => deepUpdate(state, 'auth', {
    registerError: action.error,
  }),

  [actions.AUTH_SET_LOGIN_ERROR]: () => deepUpdate(state, 'auth', {
    loginError: action.error,
  }),
}));
