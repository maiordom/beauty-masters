import * as ProfileService from '../services/Profile';

import constants from '../constants/Profile';

export const getUserProfile = () => (dispatch, getState) => {
  const auth = getState().auth;

  ProfileService.getUserProfile({
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  })
    .then((res) => {
      if (!res.error) {
        dispatch({
          type: constants.PROFILE_SET_DATA,
          ...res,
        });
      }
    });
};

export const selectMainMaster = (index) => dispatch => {
  dispatch({ type: constants.PROFILE_SET_MAIN, index });
};
