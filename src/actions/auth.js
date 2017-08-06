import * as AuthService from '../services/auth';
import actions from '../constants/auth';

import { setActivityIndicator } from './common';

export const userCreate = ({ email, password }) => dispatch => {
  dispatch(setActivityIndicator(true));

  return AuthService.userCreate({ email, password })
    .then(({ user_id }) => {
      dispatch(setActivityIndicator(false));

      dispatch({
        type: actions.AUTH_SET_USER_ID,
        userId: user_id,
      });
    })
    .catch(() => dispatch(setActivityIndicator(false)));
};
