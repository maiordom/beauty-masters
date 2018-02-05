import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';

import actions from '../constants/MasterEdit';
import * as MasterCardService from '../services/MasterCard';
import type { TCity } from '../types/City';
import type { TSubwayStation } from '../types/SubwayStation';

import { fetchCities, fetchSubwayStations } from './Geo';
import { getMasterServices, getAddresses } from './Profile';
import { refreshEditor } from './Master';

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

const masterEditCityModelSet = (cities: Array<TCity>) => (dispatch: Function) => {
  dispatch({
    type: actions.MASTER_EDIT_CITY_MODEL_SET,
    payload: { cities },
  });
};

export const getCities = () => (dispatch: Function, getState: Function) => {
  const state = getState();

  if (!isEmpty(state.geo.cities)) {
    dispatch(masterEditCityModelSet(state.geo.cities));
  } else {
    dispatch(fetchCities()).then(() => {
      const state = getState();

      dispatch(masterEditCityModelSet(state.geo.cities));
    });
  }
};

export const searchCity = (text: string, modelName: string) => ({
  type: actions.MASTER_EDIT_CITY_FIND,
  payload: { text, modelName },
});

export const selectCity = (id: number, modelName: string) => ({
  type: actions.MASTER_EDIT_CITY_SET,
  payload: {
    id,
    modelName,
  },
});

const masterEditSubwayStationModelSet = (subwayStations: Array<TSubwayStation>) => (dispatch: Function) => {
  dispatch({
    type: actions.MASTER_EDIT_SUBWAY_STATION_MODEL_SET,
    payload: { subwayStations },
  });
};

export const getSubwayStations = () => (dispatch: Function, getState: Function) => {
  const state = getState();

  if (!isEmpty(state.geo.subwayStations)) {
    dispatch(masterEditSubwayStationModelSet(state.geo.subwayStations));
  } else {
    dispatch(fetchSubwayStations()).then(() => {
      const state = getState();

      dispatch(masterEditSubwayStationModelSet(state.geo.subwayStations));
    });
  }
};

export const searchSubwayStation = (text: string, modelName: string) => ({
  type: actions.MASTER_EDIT_SUBWAY_STATION_FIND,
  payload: { text, modelName },
});

export const selectSubwayStation = (id: number, modelName: string) => ({
  type: actions.MASTER_EDIT_SUBWAY_STATION_SET,
  payload: {
    id,
    modelName,
  },
});
