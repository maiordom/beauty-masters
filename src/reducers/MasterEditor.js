import find from 'lodash/find';

import { makeReducer } from '../utils';

import actions from '../constants/master';

export default makeReducer((state, action) => ({
  [actions.MASTER_SET_PHOTO_MOCK]: () => {
    const photos = state.masterEditor[action.name];

    photos.push({
      type: 'mock',
      id: action.id,
    });

    state.masterEditor = {...state.masterEditor};
    state.masterEditor[action.name] = [...photos];

    return state;
  },

  [actions.MASTER_SET_PHOTO]: () => {
    const photos = state.masterEditor[action.name];
    const item = find(photos, {id: action.id});

    item.type = 'photo';
    item.sizes = action.sizes;
    item.mediaUrl = action.mediaUrl;
    item.fileName = action.fileName;

    state.masterEditor = {...state.masterEditor};
    state.masterEditor[action.name] = [...photos];

    return state;
  },

  [actions.MASTER_SET_FIELD_VALUE]: () => {
    const { sectionName, modelName, value } = action;
    const section = state.masterEditor[sectionName];
    const model = section[modelName];

    model.value = value;

    state.masterEditor = {...state.masterEditor};
    state.masterEditor[sectionName] = {...section};
    state.masterEditor[sectionName][modelName] = {...model};

    return state;
  },

  [actions.MASTER_SET_FIELD_PARAM]: () => {
    const { sectionName, modelName, paramValue, paramName } = action;
    const section = state.masterEditor[sectionName];
    const model = section[modelName];

    model[paramName] = paramValue;

    state.masterEditor = {...state.masterEditor};
    state.masterEditor[sectionName] = {...section};
    state.masterEditor[sectionName][modelName] = {...model};

    return state;
  },
}));
