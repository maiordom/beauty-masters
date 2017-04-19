import * as AuthService from '../services/auth';

export const registerUser = (email, password, type) =>
  dispatch => AuthService.registerUser({ email, password, type })
    .then(response => {
      console.log(response);
    });
