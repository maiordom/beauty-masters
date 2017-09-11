// @flow

import * as ProfileService from '../services/Profile';

import constants from '../constants/Profile';

export const getUserProfile = () => (dispatch: Function, getState: Function) => {
  const auth = getState().auth;

  return ProfileService.getUserProfile({
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  }, {
    include: 'master_cards',
  })
    .then((res: Object) => {
      if (!res.error) {
        dispatch({
          type: constants.PROFILE_SET_DATA,
          ...res,
        });
      }

      return res;
    });
};

export const selectMainMaster = (index: number) => (dispatch: Function) => {
  dispatch({ type: constants.PROFILE_SET_MAIN, index });
};
