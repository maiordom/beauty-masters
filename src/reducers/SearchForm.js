import reject from 'lodash/reject';
import each from 'lodash/each';
import map from 'lodash/map';

import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/search';

const setParam = (action, state) => {
  const { sectionName, modelName, paramValue, paramName } = action;
  const section = state.searchForm[sectionName];
  const model = section[modelName];

  model[paramName] = paramValue;

  deepUpdate(state, `searchForm.${sectionName}`, { [`${modelName}`]: model });
};

const updateSections = (action, parentServiceId, state) => {
  const section = state.searchForm[action.sectionName];

  state.searchForm = { ...state.searchForm };
  state.searchForm[action.sectionName] = { ...section };

  map(state.searchForm[action.sectionName], sectionModel => {
    if (sectionModel.parentServiceId === parentServiceId) {
      sectionModel.active = action.paramValue;
    }
  });
};

export default makeReducer((state, action) => ({
  [actions.SEARCH_TOOGLE_SERVICE]: () => {
    const model = state.searchForm[action.sectionName][action.modelName];

    setParam(action, state);
    updateSections(action, model.id, state);

    const { searchQuery } = state.searchForm;

    if (action.paramValue) {
      const service = { service_id: model.id };
      searchQuery.services.push(service);
    } else {
      searchQuery.services = reject(searchQuery.services, { service_id: model.id });
    }

    return state;
  },

  [actions.SEARCH_TOOGLE_EXTENSION]: () => {
    const parentServiceId = 1001;

    updateSections({ sectionName: 'servicePedicure', paramValue: action.paramValue }, parentServiceId, state);
    updateSections({ sectionName: 'serviceManicure', paramValue: action.paramValue }, parentServiceId, state);

    return state;
  },

  [actions.SEARCH_TOOGLE_WITHDRAWAL]: () => {
    const parentServiceId = 1002;

    updateSections({ sectionName: 'servicePedicure', paramValue: action.paramValue }, parentServiceId, state);
    updateSections({ sectionName: 'serviceManicure', paramValue: action.paramValue }, parentServiceId, state);

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

  [actions.SEARCH_MASTERS_ITEMS_SET]: () => deepUpdate(
    state,
    'searchForm.searchResult',
    { items: action.items },
  ),

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
