import isEmpty from 'lodash/isEmpty';

import { TCreateMaster } from '../types/CreateMaster';
import type { TCity } from '../types/City';
import type { TSubwayStation } from '../types/SubwayStation';

import * as MasterService from '../services/Master';
import * as PhotoService from '../services/Photo';

import actions from '../constants/Master';

import { fetchCities, fetchSubwayStations } from './Geo';
import { setActivityIndicator } from './Common';

export const createMaster = (customCreateMasterQuery?: TCreateMaster) => (dispatch, getState) => {
  const state = getState();
  const { auth } = state;
  const { masterCardId, createMasterQuery } = state.masterEditor;

  dispatch(setActivityIndicator(true));

  const params = {
    data: {
      attributes: {
        ...createMasterQuery,
        user_id: state.profile.userId,
      },
    },
  };

  if (!createMasterQuery.hasOwnProperty('status')) {
    params.data.attributes.status = 0;
  }

  Object.assign(params.data.attributes, customCreateMasterQuery);

  const handleResponse = ({ masterCardId }) => {
    dispatch(setActivityIndicator(false));
    dispatch({
      type: actions.MASTER_CARD_ID_SET,
      payload: { masterCardId },
    });

    if (masterCardId) {
      return { result: 'success' };
    }
  };

  const headers = {
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  };

  if (masterCardId) {
    return MasterService.updateMaster(masterCardId, params, headers)
      .then(handleResponse)
      .catch(() => dispatch(setActivityIndicator(false)));
  }

  return MasterService.createMaster(params, headers)
    .then(handleResponse)
    .catch(() => dispatch(setActivityIndicator(false)));
};

export const createMasterServices = () => (dispatch, getState) => {
  const state = getState();
  const { auth } = state;
  const masterServices = [
    ...state.masterEditor.manicureCustomServicesQuery,
    ...state.masterEditor.masterServicesQuery,
    ...state.masterEditor.pedicureCustomServicesQuery,
  ];

  if (!masterServices.length) {
    return Promise.resolve({ result: 'success' });
  }

  const params = {
    data: masterServices,
    master_card_id: state.masterEditor.masterCardId,
  };

  dispatch(setActivityIndicator(true));

  return MasterService.createMasterServices(params, {
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  })
    .then(response => {
      dispatch(setActivityIndicator(false));

      if (response) {
        return { result: 'success' };
      }
    })
    .catch(() => {
      dispatch(setActivityIndicator(false));
    });
};

export const validateServices = () => (dispatch, getState) => {
  dispatch({ type: actions.MASTER_SERVICES_VALIDATE });

  const state = getState();
  const {
    manicureCustomServices,
    pedicureCustomServices,
  } = state.masterEditor.services;

  const {
    serviceManicure,
    servicePedicure,
  } = state.masterEditor;

  if (!serviceManicure.hasValidationErrors
    && !servicePedicure.hasValidationErrors
    && !manicureCustomServices.hasValidationErrors
    && !pedicureCustomServices.hasValidationErrors
  ) {
    if (state.masterEditor.servicePedicure.activeServicesCount === 0) {
      return Promise.reject({ type: 'FILL_PEDICURE_SECTION' });
    }

    return Promise.resolve();
  }

  return Promise.reject({ type: 'VALIDATION_ERRORS' });
};

export const removePhoto = (id, modelName, mediaType) => (dispatch, getState) => {
  const state = getState();
  const { auth } = state;
  const headers = {
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  };

  PhotoService.deletePhoto({ id }, headers, mediaType).then((res) => {
    if (res.status === 'success') {
      dispatch({
        type: actions.MASTER_PHOTO_REMOVE,
        payload: {
          id,
          modelName,
        },
      });
    }
  });
};

export const setGeneralParam = (modelName, value, sectionName) => ({
  type: actions.MASTER_GENERAL_PARAM_SET,
  modelName,
  sectionName,
  value,
});

export const setGeneralPhone = (modelName, value, sectionName) => ({
  type: actions.MASTER_GENERAL_PHONE_SET,
  payload: { modelName, value, sectionName },
});

export const setServiceParam = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_SERVICE_SET_PARAM,
  modelName,
  paramName,
  paramValue,
  sectionName,
});

export const toggleService = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_SERVICE_TOGGLE,
  modelName,
  paramName,
  paramValue,
  sectionName,
});

export const setCalendarInterval = (modelName, id, sectionName) => ({
  type: actions.MASTER_CALENDAR_INTERVAL_SET,
  payload: {
    modelName, id, sectionName, paramValue: id,
  },
});

export const setCalendarSchedule = (modelName, changes, sectionName) => ({
  type: actions.MASTER_CALENDAR_SCHEDULE_SET,
  payload: { modelName, changes, sectionName },
});

export const toogleCustomService = (modelName, sectionName, active, index = 0) => ({
  type: actions.MASTER_CUSTOM_SERVICE_TOGGLE,
  modelName,
  sectionName,
  active,
  index,
});

export const setCustomServiceParam = (modelName, changes, index, sectionName) => ({
  type: actions.MASTER_CUSTOM_SERVICE_SET_PARAM,
  modelName,
  changes,
  index,
  sectionName,
});

export const setPlaceDetail = (place, sectionName) => ({
  type: actions.MASTER_PLACE_SET,
  payload: {
    modelName: 'addressField', paramName: 'value', paramValue: place, sectionName,
  },
});

export const setPlaceLocation = (location, sectionName) => ({
  type: actions.MASTER_LOCATION_SET,
  payload: { location, sectionName },
});

export const setAddressField = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_ADDRESS_SET_PARAM,
  payload: {
    modelName, paramName, paramValue, sectionName,
  },
});

export const setTimeTableField = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_TIME_TABLE_SET_PARAM,
  payload: {
    modelName, paramName, paramValue, sectionName,
  },
});

export const setCustomDatesField = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_CUSTOM_DATES_SET_PARAM,
  payload: {
    modelName, paramName, paramValue, sectionName,
  },
});

export const refreshEditor = () => ({
  type: actions.MASTER_EDITOR_REFRESH,
});

export const masterEditCityModelSet = (cities: Array<TCity>) => (dispatch: Function) => {
  dispatch({
    type: actions.MASTER_CITY_MODEL_SET,
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
  type: actions.MASTER_CITY_FIND,
  payload: { text, modelName },
});

export const selectCity = (id: number, modelName: string) => ({
  type: actions.MASTER_CITY_SET,
  payload: {
    id,
    modelName,
  },
});

const masterEditSubwayStationModelSet = (
  modelName: string,
  subwayStations: Array<TSubwayStation>,
) => (dispatch: Function) => {
  dispatch({
    type: actions.MASTER_SUBWAY_STATION_MODEL_SET,
    payload: { subwayStations, modelName },
  });
};

export const getSubwayStations = (
  modelName: string,
  cityId: number,
) => (dispatch: Function, getState: Function) => {
  const state = getState();

  if (!isEmpty(state.geo.subwayStations[cityId])) {
    dispatch(masterEditSubwayStationModelSet(modelName, state.geo.subwayStations[cityId]));
  } else {
    dispatch(fetchSubwayStations(cityId)).then(() => {
      const state = getState();

      dispatch(masterEditSubwayStationModelSet(modelName, state.geo.subwayStations[cityId]));
    });
  }
};

export const searchSubwayStation = (text: string, modelName: string) => ({
  type: actions.MASTER_SUBWAY_STATION_FIND,
  payload: { text, modelName },
});

export const selectSubwayStation = (id: number, modelName: string) => ({
  type: actions.MASTER_SUBWAY_STATION_SET,
  payload: {
    id,
    modelName,
  },
});

export {
  createSchedules,
  handleTimeTable,
  handleAddress,
} from './MasterCalendar';

export {
  uploadMasterPhoto,
} from './MasterUpload';
