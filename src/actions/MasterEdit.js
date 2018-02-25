import find from 'lodash/find';

import actions from '../constants/MasterEdit';
import * as MasterCardService from '../services/MasterCard';

import { getMasterServices, getAddresses } from './Profile';
import { setGeneralParam, refreshEditor } from './Master';

export const setGeneralInfo = (masterCard) => ({
  type: actions.MASTER_EDIT_GENERAL_INFO_SET,
  payload: { masterCard },
});

export const setHomeAllowance = (masterCard) => ({
  type: actions.MASTER_EDIT_HOME_ALLOWANCE_SET,
  payload: { masterCard },
});

export const setManicureServices = (masterCard) => ({
  type: actions.MASTER_EDIT_MANICURE_SERVICES_SET,
  payload: { masterCard },
});

export const setPedicureServices = (masterCard) => ({
  type: actions.MASTER_EDIT_PEDICURE_SERVICES_SET,
  payload: { masterCard },
});

export const setHandlingTools = (masterCard) => ({
  type: actions.MASTER_EDIT_HANDLING_TOOLS_SET,
  payload: { masterCard },
});

export const setCalendars = (masterCard) => ({
  type: actions.MASTER_EDIT_CALENDARS_SET,
  payload: { masterCard },
});

export const setStatus = (masterCardId) => ({
  type: actions.MASTER_EDIT_STATUS_SET,
  payload: { masterCardId },
});

export const getPhotos = (id: number) => (dispatch: Function) =>
  MasterCardService.getMasterById(id)
    .then((res: Object) => {
      if (!res.error) {
        dispatch({
          type: actions.MASTER_EDIT_PHOTOS_SET,
          payload: { masterCard: res },
        });
      }

      return res;
    });

export const getMasterInfo = (id: number) => (dispatch: Function, getState: Function) =>
  getPhotos(id)(dispatch).then((res) => {
    if (!res.error) {
      const state = getState();
      const masterCard = find(state.profile.masterCards, { isMain: true });

      if (masterCard && masterCard.about) {
        dispatch(setGeneralParam('aboutField', masterCard.about, 'info'));
      }
    }

    return res;
  });

export const getServices = () => (dispatch: Function, getState: Function) => {
  const state = getState();

  if (state.masterEditor.editStatus.services === 'required') {
    const masterCard = find(state.profile.masterCards, { isMain: true });

    return dispatch(getMasterServices(masterCard.id)).then((res) => {
      if (!res.error) {
        dispatch(refreshEditor());
        dispatch(setStatus(masterCard.id));
        dispatch(setHomeAllowance(masterCard));
        dispatch(setManicureServices(masterCard));
        dispatch(setPedicureServices(masterCard));
        dispatch(setHandlingTools(masterCard));
      }

      return res;
    });
  }

  return Promise.resolve({});
};

export const getCalendars = () => (dispatch: Function, getState: Function) => {
  const state = getState();

  if (state.masterEditor.editStatus.addresses === 'required') {
    const masterCard = find(state.profile.masterCards, { isMain: true });

    dispatch(getAddresses(masterCard.id)).then((res) => {
      if (!res.error) {
        dispatch(refreshEditor());
        dispatch(setStatus(masterCard.id));
        dispatch(setCalendars(masterCard));
      }
    });
  }
};
