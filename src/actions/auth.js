import * as AuthService from '../services/auth';
import actions from '../constants/auth';

export const userCreate = ({ email, password }) => dispatch =>
  AuthService.userCreate({ email, password })
    .then(({ user_id }) => {
      dispatch({
        type: actions.AUTH_SET_USER_ID,
        userId: user_id
      })
    });
