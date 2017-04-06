import { uploadFile } from '../services/upload';

import actions from '../constants/search';

export const setFieldValue = (modelName, value, sectionName) => ({
    type: actions.SEARCH_SET_FIELD_VALUE,
    modelName,
    value,
    sectionName,
});

export const setFieldParam = (modelName, paramName, paramValue, sectionName) => ({
    type: actions.SEARCH_SET_FIELD_PARAM,
    modelName,
    paramName,
    paramValue,
    sectionName,
});

export const setItemById = (modelName, id, sectionName) => ({
    type: actions.SEARCH_SET_ITEM_BY_ID,
    modelName,
    id,
    sectionName,
});

export const toogleService = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.SEARCH_PARAM_TOOGLE,
  modelName,
  paramName,
  paramValue,
  sectionName,
});