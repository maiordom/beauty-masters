// @flow

import * as ProfileService from '../services/Profile';

import actions from '../constants/Profile';
import { setActivityIndicator } from './Common';

export const getUserProfile = () => (dispatch: Function, getState: Function) => {
  const auth = getState().auth;

  dispatch(setActivityIndicator(true));

  return ProfileService.getUserProfile({
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  }, {
    include: 'master_cards',
  }).then((res: Object) => {
    if (!res.error) {
      dispatch({
        type: actions.PROFILE_DATA_SET,
        payload: res,
      });
    }

    dispatch(setActivityIndicator(false));

    return res;
  }).catch(() => {
    dispatch(setActivityIndicator(false));
  });
};

export const getMasterServices = (masterCardId: number) => (dispatch: Function) =>
  ProfileService.getMasterServices({
    filters: `[{"operator":"=","attribute":"master_card_id","value":"${masterCardId}"}]`,
  }).then((res: Object) => {
    if (!res.error) {
      dispatch({
        type: actions.PROFILE_MASTER_SERVICES_SET,
        payload: { masterServices: res, masterCardId },
      });
    }

    return res;
  });

export const getAddresses = (masterCardId: number) => (dispatch: Function) =>
  ProfileService.getAddresses({
    filters: `[{"operator":"=","attribute":"master_card_id","value":${masterCardId}}]`,
    include: 'timetables,schedules',
  }).then((res: Object) => {
    if (!res.error) {
      dispatch({
        type: actions.PROFILE_ADDRESSES_SET,
        payload: { addresses: res, masterCardId },
      });
    }

    return res;
  });

export const selectMainMaster = (index: number) => ({
  type: actions.PROFILE_MAIN_SET,
  payload: { index },
});

export const selectProfileSection = (sectionKey: string) => ({
  type: actions.PROFILE_SECTION_SET,
  payload: { sectionKey },
});

export const recoverPassword = (email) => dispatch => {
  dispatch(setActivityIndicator(true));

  const params = {
    data: {
      attributes: {
        email,
      },
    },
  };

  return ProfileService.sendResetPasswordLink(params)
    .then(res => {
      dispatch(setActivityIndicator(false));

      return res;
    });
};
