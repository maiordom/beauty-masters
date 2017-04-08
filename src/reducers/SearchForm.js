import reject from 'lodash/reject';

import { makeReducer } from '../utils';

import actions from '../constants/search';

const setParam = (action, state) => {
  const {sectionName, modelName, paramValue, paramName} = action;
  const section = state.searchForm[sectionName];
  const model = section[modelName];

  model[paramName] = paramValue;

  state.searchForm = {...state.searchForm};
  state.searchForm[sectionName] = {...section};
  state.searchForm[sectionName][modelName] = {...model};
};

export default makeReducer((state, action) => ({
  [actions.SEARCH_PARAM_TOOGLE]: () => {
    setParam(action, state);

    const searchQuery = state.searchForm.searchQuery;
    const model = state.masterEditor[action.sectionName][action.modelName];

    if (action.paramValue) {
      const service = { service_id: model.id };
      searchQuery.services.push(service);
    } else {
      searchQuery.services = reject(searchQuery.services, { service_id: model.id });
    }

    return state;
  },

  [actions.SEARCH_PARAM_MASTER_TYPE]: () => {

  }
}));
