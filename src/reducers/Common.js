// @flow

import { AsyncStorage } from 'react-native';

import { makeReducer, deepUpdate } from '../utils';

import a from '../constants/Common';

export default makeReducer((state, action) => ({
  [a.USER_LOCATION_SET]: (state, { payload: { lon, lat } }) =>
    deepUpdate(state, 'geo.userLocation', {
      lon,
      lat,
    }),

  [a.GEO_CITIES_SET]: () => deepUpdate(state, 'geo', {
    cities: action.payload.cities,
  }),

  [a.GEO_DATA_SET]: () => deepUpdate(state, 'geo.places', {
    items: action.places,
  }),

  [a.GEO_DATA_CLEAR]: () => deepUpdate(state, 'geo.places', {
    items: [],
    selected: null,
  }),

  [a.GEO_PLACE_SET]: (state, { payload: { place } }) => deepUpdate(state, 'geo.places', {
    selected: place,
  }),

  [a.GEO_SUBWAY_STATIONS_SET]: () => deepUpdate(state, 'geo', {
    subwayStations: action.payload.subwayStations,
  }),

  [a.DICTIONARIES_CATEGORY_SERVICES_SET]: (state, { payload: { categoryServices = [] } }) => {
    if (!categoryServices.length) {
      return state;
    }

    const categoryServiceById = {};
    const categoryServiceByKey = {};

    AsyncStorage.setItem('categoryServices', JSON.stringify(categoryServices));

    categoryServices.forEach((categoryService) => {
      categoryServiceById[categoryService.id] = categoryService;
      categoryServiceByKey[categoryService.key] = categoryService;
    });

    state.dictionaries.categoryServiceById = categoryServiceById;
    state.dictionaries.categoryServiceByKey = categoryServiceByKey;

    return state;
  },

  [a.DICTIONARIES_SERVICES_SET]: (state, { payload: { services = [] } }) => {
    if (!services.length) {
      return state;
    }

    const serviceById = {};
    const serviceByKey = {};

    AsyncStorage.setItem('services', JSON.stringify(services));

    const homeDepartureServices = [];

    services.forEach((service) => {
      if (service.key === 'AtHome') {
        homeDepartureServices.push(service);
      }

      serviceById[service.id] = service;
      serviceByKey[service.key] = service;
    });

    state.dictionaries.serviceById = serviceById;
    state.dictionaries.serviceByKey = serviceByKey;
    state.dictionaries.homeDepartureServices = homeDepartureServices;

    return state;
  },

  [a.ACTIVITY_INDICATOR_ANIMATING]: () =>
    deepUpdate(state, 'activityIndicator', {
      animating: action.animating,
    }),
}));
