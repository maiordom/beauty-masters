import reject from 'lodash/reject';
import each from 'lodash/each';
import map from 'lodash/map';

import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/Search';

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
  [actions.SEARCH_TOGGLE_SERVICE]: () => {
    const model = state.searchForm[action.sectionName][action.modelName];

    setParam(action, state);
    updateSections(action, model.id, state);

    const { searchQuery } = state.searchForm;

    if (action.paramValue) {
      searchQuery.services.push(model.id);
    } else {
      searchQuery.services = reject(searchQuery.services, id => id === model.id);
    }

    return state;
  },

  [actions.SEARCH_TOGGLE_EXTENSION]: () => {
    const categoryKey = 1001;
    const servicePedicure = { sectionName: 'servicePedicure', paramValue: action.paramValue };
    const serviceManicure = { sectionName: 'serviceManicure', paramValue: action.paramValue };

    updateSections(servicePedicure, categoryKey, state);
    updateSections(serviceManicure, categoryKey, state);

    return state;
  },

  [actions.SEARCH_TOGGLE_WITHDRAWAL]: () => {
    const categoryKey = 1002;
    const servicePedicure = { sectionName: 'servicePedicure', paramValue: action.paramValue };
    const serviceManicure = { sectionName: 'serviceManicure', paramValue: action.paramValue };

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

  [actions.SEARCH_ADDRESSES_ITEMS_SET]: () => deepUpdate(
    state,
    `searchForm.${action.sectionName}.${action.modelName}`,
    { items: action.items },
  ),

  [actions.SEARCH_ITEMS_RESET]: () => deepUpdate(
    state,
    `searchForm.${action.sectionName}.${action.modelName}`,
    { items: [] },
  ),

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
