import * as ProfileService from '../services/profile';

import constants from '../constants/profile';

export const getUserProfile = () => (dispatch, getState) => {
  const auth = getState().auth;

  ProfileService.getUserProfile({
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  })
    .then((res) => dispatch({
      type: constants.PROFILE_SET_DATA,
      ...res,
    }));
};

export const selectMainMaster = (index) => dispatch => {
  dispatch({ type: constants.PROFILE_SET_MAIN, index });
};
