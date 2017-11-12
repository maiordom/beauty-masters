// @flow

import pickBy from 'lodash/pickBy';

import actions from '../constants/Search';
import * as SearchService from '../services/Search';

import type { TSearchQuery } from '../types/CreateSearchQuery';

export const setDay = (day: string) => ({
  type: actions.SEARCH_SET_DAY,
  day,
});

export const setItemById = (modelName: string, id: number, sectionName: string) => ({
  type: actions.SEARCH_SET_MASTER_TYPE,
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
  payload: { modelName, paramName, paramValue, sectionName },
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

export const searchMasters = (params: TSearchQuery = {}) => (dispatch: Function, getState: Function) => {
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
          type: actions.SEARCH_MASTERS_ITEMS_SET,
          items: res,
        });
      }
    });
};

export const setSearchLocation = (lat: number, lon: number) => ({
  type: actions.SEARCH_LOCATION_SET,
  payload: { lat, lon },
});

export const citiesAdd = (id: number) => ({ type: actions.SEARCH_CITY_ADD, id });

export const citiesReset = () => ({
  type: actions.SEARCH_ITEMS_RESET,
  modelName: 'cities',
  sectionName: 'general',
});
