import reject from 'lodash/reject';
import each from 'lodash/each';
import update from 'immutability-helper';

import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/search';

const setParam = (action, state) => {
  const { sectionName, modelName, paramValue, paramName } = action;
  const section = state.searchForm[sectionName];
  const model = section[modelName];

  model[paramName] = paramValue;

  state.searchForm = { ...state.searchForm };
  state.searchForm[sectionName] = { ...section };
  state.searchForm[sectionName][modelName] = { ...model };
};

const updateSections = (action, state) => {
  const { sectionName, modelName } = action;
  const section = state.searchForm[sectionName];
  const model = section[modelName];

  each(state.searchForm[action.sectionName], sectionModel => {
    if (sectionModel.parentServiceId === model.id) {
      sectionModel.active = action.paramValue;
    }
  });
};

export default makeReducer((state, action) => ({
  [actions.SEARCH_TOOGLE_SERVICE]: () => {
    setParam(action, state);
    updateSections(action, state);

    const { searchQuery } = state.searchForm;
    const model = state.searchForm[action.sectionName][action.modelName];

    if (action.paramValue) {
      const service = { service_id: model.id };
      searchQuery.services.push(service);
    } else {
      searchQuery.services = reject(searchQuery.services, { service_id: model.id });
    }

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

    state.searchForm = { ...state.searchForm };
    state.searchForm[sectionName] = { ...section };
    state.searchForm[sectionName][modelName] = { ...model };
    state.searchForm[sectionName][modelName].items = [...model.items];

    state.searchForm.searchQuery.master_type = model.selected.id;

    return state;
  },

  [actions.SEARCH_ADDRESSES_SET]: () => deepUpdate(state, 'searchForm.general.addresses.items', action.items),

  [actions.SEARCH_ADDRESSES_RESET]: () =>
    update(state, {
      searchForm: { general: { addresses: { items: { $set: [] } } } }
    }),

  [actions.SEARCH_DEPARTURE_TOGGLE]: () =>
    update(state, { searchForm: { searchQuery: { isDeparture: { $set: !state.searchForm.searchQuery.isDeparture } } } })
}));
