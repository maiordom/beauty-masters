import { makeReducer, deepUpdate } from '../utils';

import a from '../constants/Common';

export default makeReducer((state, action) => ({
  [a.GEO_DATA_SET]: () => deepUpdate(state, 'geo', {
    places: action.places,
  }),

  [a.GEO_DATA_CLEAR]: () => deepUpdate(state, 'geo', {
    places: [],
  }),

  [a.DICTIONARIES_CATEGORY_SERVICES_SET]: (state, { payload: { categoryServices = [] } }) => {
    const categoryServiceById = {};
    const categoryServiceByKey = {};

    categoryServices.forEach(categoryService => {
      categoryServiceById[categoryService.id] = categoryService;
      categoryServiceByKey[categoryService.key] = categoryService;
    });

    state.dictionaries.categoryServiceById = categoryServiceById;
    state.dictionaries.categoryServiceByKey = categoryServiceByKey;

    return state;
  },

  [a.DICTIONARIES_SERVICES_SET]: (state, { payload: { services = [] } }) => {
    const serviceById = {};
    const serviceByKey = {};

    services.forEach(service => {
      serviceById[service.id] = service;
      serviceByKey[service.key] = service;
    });

    state.dictionaries.serviceById = serviceById;
    state.dictionaries.serviceByKey = serviceByKey;

    return state;
  },

  [a.ACTIVITY_INDICATOR_ANIMATING]: () =>
    deepUpdate(state, 'activityIndicator', {
      animating: action.animating,
    }),
}));
