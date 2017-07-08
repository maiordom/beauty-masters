// @flow
import actions from '../constants/search';
import * as SearchService from '../services/search';

import type { SearchMastersParamsType } from '../types/SearchFormTypes';

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

export const toogleService = (
  modelName: string,
  paramName: string,
  paramValue: boolean,
  sectionName: string,
) => ({
  type: actions.SEARCH_TOOGLE_SERVICE,
  modelName,
  paramName,
  paramValue,
  sectionName,
});

export const toggleExtension = (paramValue: boolean) => ({
  type: actions.SEARCH_TOOGLE_EXTENSION,
  paramValue,
});

export const toggleWithdrawal = (paramValue: boolean) => ({
  type: actions.SEARCH_TOOGLE_WITHDRAWAL,
  paramValue,
});

export const toggleDeparture = () => ({ type: actions.SEARCH_DEPARTURE_TOGGLE });

type ActionSetItems = {
  type: string,
  items: Array<{
    label: string,
    id: number
  }>
};

// mock addresses
const addresses = [
  { label: 'Московская', id: 1 },
  { label: 'Петровская', id: 2 },
  { label: 'Васильевская', id: 3 },
  { label: 'Крутовская', id: 4 },
  { label: 'Змеевская', id: 5 },
  { label: 'Путевская', id: 6 },
  { label: 'Бульонская', id: 7 },
  { label: 'Макаронская', id: 8 },
  { label: 'Крашовская', id: 9 },
  { label: 'Питерская', id: 10 },
  { label: 'Ростовская', id: 11 },
  { label: 'Бельгийская', id: 12 },
  { label: 'Парийская', id: 13 },
  { label: 'Американская', id: 14 },
  { label: 'Бразильская', id: 15 },
  { label: 'Курская', id: 16 },
  { label: 'Буржская', id: 17 },
  { label: 'Кружская', id: 18 },
];

export const searchAddress = (address: string) => (
  dispatch: (ActionSetItems) => null,
  getState: () => Object,
) => {
  const state = getState();
  const query = `${state.searchForm.general.cities.selected.label} ${address}`;

  SearchService.geoAutoComplete({ query })
    .then(response => {
      dispatch({
        type: actions.SEARCH_ADDRESSES_ITEMS_SET,
        items: addresses.slice(0, address.length),
        modelName: 'addresses',
        sectionName: 'general',
      });
    });
};

export const searchMasters = (query: SearchMastersParamsType = {}) => (
  dispatch: () => null,
  getState: () => Object
) => {
  const state = getState();
  const { services } = state.searchForm.searchQuery;

  query.services = services;

  SearchService.searchMasters(query)
    .then(items => {
      dispatch({
        type: actions.SEARCH_MASTERS_ITEMS_SET,
        items,
      });
    });
};

export const addressesReset = () => ({
  type: actions.SEARCH_ITEMS_RESET,
  modelName: 'addresses',
  sectionName: 'general',
});

export const citiesAdd = (id: number) => ({ type: actions.SEARCH_CITY_ADD, id });

export const citiesReset = () => ({
  type: actions.SEARCH_ITEMS_RESET,
  modelName: 'cities',
  sectionName: 'general',
});
