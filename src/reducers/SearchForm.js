import reject from 'lodash/reject';
import each from 'lodash/each';
import map from 'lodash/map';

import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/Search';

import { TSearchQuery } from '../types/CreateSearchQuery';

const setParam = (action, state) => {
  const { sectionName, modelName, paramValue, paramName } = action;
  const section = state.searchForm[sectionName];
  const model = section[modelName];

  model[paramName] = paramValue;

  deepUpdate(state, `searchForm.${sectionName}`, { [`${modelName}`]: model });
};

const updateSections = (action, categoryKey, state) => {
  const section = state.searchForm[action.sectionName];

  state.searchForm = { ...state.searchForm };
  state.searchForm[action.sectionName] = { ...section };

  map(state.searchForm[action.sectionName], sectionModel => {
    if (sectionModel.categoryKey === categoryKey) {
      sectionModel.active = action.paramValue;
    }
  });
};

export default makeReducer((state, action) => ({
  [actions.SEARCH_SERVICE_TOGGLE]: (state, { payload }) => {
    const { sectionName, modelName, id } = payload;
    const model = state.searchForm[sectionName][modelName];

    setParam(payload, state);
    updateSections(payload, id, state);

    const searchQuery: TSearchQuery = state.searchForm.searchQuery;
    const { serviceByKey } = state.dictionaries;

    if (payload.paramValue) {
      const id = serviceByKey[model.dictionaryKey].id;
      searchQuery.service_ids.push(id);
    } else {
      searchQuery.service_ids = reject(searchQuery.service_ids, { id });
    }

    return state;
  },

  [actions.SEARCH_SERVICE_CATEGORY_TOGGLE]: (state, { payload }) => {
    const { sectionName, modelName, id } = payload;
    const model = state.searchForm[sectionName][modelName];

    setParam(payload, state);
    updateSections(payload, id, state);

    const searchQuery: TSearchQuery = state.searchForm.searchQuery;
    const { categoryServiceByKey } = state.dictionaries;

    if (payload.paramValue) {
      const id = categoryServiceByKey[model.dictionaryKey].id;
      searchQuery.category_service_ids.push(id);
    } else {
      searchQuery.category_service_ids = reject(searchQuery.category_service_ids, { id });
    }

    return state;
  },

  [actions.SEARCH_MANICURE_TOGGLE]: (state, { payload: { paramValue } }) => {
    const categoryKey = 'manicure';
    const serviceManicure = { sectionName: 'serviceManicure', paramValue };

    updateSections(serviceManicure, categoryKey, state);

    return state;
  },

  [actions.SEARCH_PEDICURE_TOGGLE]: (state, { payload: { paramValue } }) => {
    const categoryKey = 'pedicure';
    const serviceManicure = { sectionName: 'servicePedicure', paramValue };

    updateSections(serviceManicure, categoryKey, state);

    return state;
  },

  [actions.SEARCH_EXTENSION_TOGGLE]: (state, { payload: { paramValue } }) => {
    const categoryKey = 'extension';
    const servicePedicure = { sectionName: 'servicePedicure', paramValue };
    const serviceManicure = { sectionName: 'serviceManicure', paramValue };

    updateSections(servicePedicure, categoryKey, state);
    updateSections(serviceManicure, categoryKey, state);

    return state;
  },

  [actions.SEARCH_WITHDRAWAL_TOGGLE]: (state, { payload: { paramValue } }) => {
    const categoryKey = 'removing';
    const servicePedicure = { sectionName: 'servicePedicure', paramValue };
    const serviceManicure = { sectionName: 'serviceManicure', paramValue };

    updateSections(servicePedicure, categoryKey, state);
    updateSections(serviceManicure, categoryKey, state);

    return state;
  },

  [actions.SEARCH_SET_DAY]: () => {
    state.searchForm.searchQuery.schedule = [action.day];

    return state;
  },

  [actions.SEARCH_SET_MASTER_TYPE]: () => {
    const { modelName, id, sectionName } = action;
    const section = state.searchForm[sectionName];
    const model = section[modelName];

    each(model.items, item => {
      item.active = item.id === id;

      if (item.active) {
        model.selected = item;
      }
    });

    deepUpdate(state, `searchForm.${sectionName}.${modelName}`, { items: [...model.items] });
    deepUpdate(state, 'searchForm.searchQuery', { master_type: model.selected.id });

    return state;
  },

  [actions.SEARCH_MASTERS_ITEMS_SET]: () => {
    const { items } = action;

    items.forEach(item => {
      item.services.forEach(service => {
        service.title = state.dictionaries.serviceById[service.id].title;
      });
    });

    deepUpdate(state, 'searchForm.searchResult', { items });

    return state;
  },

  [actions.SEARCH_LOCATION_SET]: (state, { payload: { lat, lon } }) =>
    deepUpdate(state, 'searchForm.searchQuery', {
      lat,
      lon,
    }),

  [actions.SEARCH_LOCATION_NAME_SET]: (state, { payload: { label } }) =>
    deepUpdate(state, 'searchForm.general.place', {
      label,
    }),

  [actions.SEARCH_DEPARTURE_TOGGLE]: () => deepUpdate(
    state,
    'searchForm.searchQuery',
    { isDeparture: !state.searchForm.searchQuery.isDeparture },
  ),

  [actions.SEARCH_CITY_ADD]: () => {
    const selected = state.searchForm.general.cities.items.find(city => city.id === action.id);

    deepUpdate(state, 'searchForm.searchQuery', { cityId: action.id });
    return deepUpdate(state, 'searchForm.general.cities', { selected });
  },
}));
