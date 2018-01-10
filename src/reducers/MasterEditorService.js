import find from 'lodash/find';
import assign from 'lodash/assign';
import reject from 'lodash/reject';

import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/Master';

import { setParam } from './MasterEditorHelpers';

import {
  validateCustomServices,
  validateGeneralServices,
} from './MasterServicesValidate';

export default makeReducer((state, action) => ({
  [actions.MASTER_SERVICE_TOGGLE]: () => {
    setParam(action, state);

    let { masterServicesQuery } = state.masterEditor;
    const model = state.masterEditor[action.sectionName][action.modelName];
    const modelInfo = state.dictionaries.serviceByKey[model.dictionaryKey];

    if (action.paramValue) {
      const service = {
        attributes: {
          category_service_id: modelInfo.categoryId,
          service_id: modelInfo.id,
        },
      };
      masterServicesQuery.push(service);
    } else {
      masterServicesQuery = reject(masterServicesQuery, ((item) => (
        item.attributes.service_id === modelInfo.id
      )));
    }

    state.masterEditor.masterServicesQuery = masterServicesQuery;

    return state;
  },

  [actions.MASTER_SERVICE_SET_PARAM]: () => {
    const { sectionName, modelName } = action;
    setParam(action, state);

    const { masterServicesQuery } = state.masterEditor;
    const model = state.masterEditor[sectionName][modelName];
    const modelInfo = state.dictionaries.serviceByKey[model.dictionaryKey];
    let service = find(masterServicesQuery, (item) => (
      item.attributes.service_id === modelInfo.id
    ));

    if (!service) {
      service = {
        attributes: {
          category_service_id: modelInfo.categoryId,
          service_id: modelInfo.id,
        },
      };
      masterServicesQuery.push(service);
    }

    service.attributes[action.paramName] = action.paramValue;

    if (action.paramName === 'price' && action.paramValue !== '') {
      model.errorFillPrice = false;
    }

    return state;
  },

  [actions.MASTER_CUSTOM_SERVICE_TOGGLE]: () => {
    const {
      sectionName, modelName, active, index,
    } = action;
    const model = state.masterEditor[sectionName][modelName];
    const customServicesQuery = state.masterEditor[model.queryParam];
    const modelInfo = state.dictionaries.categoryServiceByKey[model.dictionaryKey];
    const { items } = model;

    if (active) {
      items.push({ active });
      customServicesQuery.push({
        attributes: {
          category_service_id: modelInfo.id,
        },
      });
    } else {
      items.splice(index, 1);
      customServicesQuery.splice(index, 1);
    }

    return deepUpdate(state, `masterEditor.${sectionName}.${modelName}`, { items: [...items] });
  },

  [actions.MASTER_CUSTOM_SERVICE_SET_PARAM]: () => {
    const {
      sectionName, modelName, changes, index,
    } = action;
    const model = state.masterEditor[sectionName][modelName];
    const { items } = model;
    const item = items[index];
    const customService = state.masterEditor[model.queryParam][index];

    assign(item, changes);
    assign(customService.attributes, changes);

    if (typeof item.title === 'string' && item.title.length && item.errorFillTitle) {
      item.errorFillTitle = false;
    }

    if (typeof item.price === 'number' && item.price > 0 && item.errorFillPrice) {
      item.errorFillPrice = false;
    }

    return deepUpdate(state, `masterEditor.${sectionName}.${modelName}`, { items: [...items] });
  },

  [actions.MASTER_SERVICES_VALIDATE]: () => {
    state = validateGeneralServices(state);
    state = validateCustomServices(state);

    return state;
  },
}));
