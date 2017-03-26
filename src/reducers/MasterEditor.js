import find from 'lodash/find';
import each from 'lodash/each';

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

  [actions.MASTER_SET_ITEM_BY_ID]: () => {
    const { modelName, id, sectionName } = action;
    const section = state.masterEditor[sectionName];
    const model = section[modelName];

    each(model.items, item => {
      item.active = item.id === id;

      if (item.active) {
        model.selected = item;
      }
    });

    state.masterEditor = {...state.masterEditor};
    state.masterEditor[sectionName] = {...section};
    state.masterEditor[sectionName][modelName] = {...model};
    state.masterEditor[sectionName][modelName].items = [...model.items];

    return state;
  },

  [actions.MASTER_SET_CUSTOM_DATE]: () => {
    const { sectionName, changes } = action;
    const { timeStart, timeEnd, date, workInThisDay } = changes;
    const section = state.masterEditor[sectionName];
    const model = section.customDates;

    const dateObject = {
      date: date,
      status: workInThisDay,
      timeEnd: timeEnd,
      timeStart: timeStart,
    };
    const dateCurrent = find(model.items, { date });

    if (dateCurrent) {
      Object.assign(dateCurrent, dateObject);
    } else {
      model.items.push(dateObject);
    }

    state.masterEditor = {...state.masterEditor};
    state.masterEditor[sectionName] = {...section};
    state.masterEditor[sectionName].customDates = {...model};
    state.masterEditor[sectionName].customDates.items = [...model.items];

    return state;
  }
}));
