// @flow

import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';

import actions from '../constants/Search';
import * as SearchService from '../services/Search';

import { fetchCities } from './Geo';

import type { TSearchQuery } from '../types/CreateSearchQuery';

export const setDay = (day: string) => ({
  type: actions.SEARCH_SET_DAY,
  day,
});

export const setMasterType = (modelName: string, id: number, sectionName: string) => ({
  type: actions.SEARCH_MASTER_TYPE_SET,
  modelName,
  id,
  sectionName,
});

export const toggleService = (
  modelName: string,
  paramName: string,
  paramValue: boolean,
  sectionName: string,
) => ({
  type: actions.SEARCH_SERVICE_TOGGLE,
  payload: {
    modelName, paramName, paramValue, sectionName,
  },
});

export const toggleServiceCategory = (
  modelName: string,
  paramName: string,
  paramValue: boolean,
  sectionName: string,
) => ({
  type: actions.SEARCH_SERVICE_CATEGORY_TOGGLE,
  payload: {
    modelName, paramName, paramValue, sectionName,
  },
});

export const toggleManicure = (paramValue: boolean) => ({
  type: actions.SEARCH_MANICURE_TOGGLE,
  payload: { paramValue },
});

export const togglePedicure = (paramValue: boolean) => ({
  type: actions.SEARCH_PEDICURE_TOGGLE,
  payload: { paramValue },
});

export const toggleExtension = (paramValue: boolean) => ({
  type: actions.SEARCH_EXTENSION_TOGGLE,
  payload: { paramValue },
});

export const toggleWithdrawal = (paramValue: boolean) => ({
  type: actions.SEARCH_WITHDRAWAL_TOGGLE,
  payload: { paramValue },
});

export const toggleDeparture = () => ({ type: actions.SEARCH_DEPARTURE_TOGGLE });

type ActionSetItems = {
  type: string,
  items: Array<{
    label: string,
    id: number
  }>
};

const searchMastersWithAction = (action: string) => (params: TSearchQuery = {}) => (dispatch: Function, getState: Function) => {
  const { searchQuery } = getState().searchForm;

  params = Object.assign({}, searchQuery, params);

  SearchService.searchMasters({
    query: JSON.stringify(pickBy(params, (item => {
      if (item && item.constructor === Array && item.length === 0) {
        return false;
      }

      return item !== undefined;
    }))),
  })
    .then((res: Object) => {
      if (!res.error) {
        dispatch({
          type: action,
          items: res,
        });
      }
    });
};

export const searchMasters = searchMastersWithAction(actions.SEARCH_MASTERS_ITEMS_SET);
export const searchMastersList = searchMastersWithAction(actions.SEARCH_MASTERS_LIST_ITEMS_SET);

export const setSearchLocation = (lat: number, lon: number) => ({
  type: actions.SEARCH_LOCATION_SET,
  payload: { lat, lon },
});

export const setSearchLocationName = (label: string) => ({
  type: actions.SEARCH_LOCATION_NAME_SET,
  payload: { label },
});

export const searchCitySelect = (id: number) => ({ type: actions.SEARCH_CITY_SET, id });

const searchCityReset = (cities: Array<Object>) => (dispatch: Function) => {
  dispatch({
    type: actions.SEARCH_CITY_RESET,
    payload: { cities },
  });
};

export const citiesReset = () => (dispatch: Function, getState: Function) => {
  const state = getState();

  if (!isEmpty(state.geo.cities)) {
    dispatch(searchCityReset(state.geo.cities));
  } else {
    dispatch(fetchCities()).then(() => {
      const state = getState();

      dispatch(searchCityReset(state.geo.cities));
    });
  }
};

export const searchCityForText = (text: string) => ({ type: actions.SEARCH_CITY_FIND, payload: { text } });
