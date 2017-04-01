import find from 'lodash/find';
import each from 'lodash/each';
import assign from 'lodash/assign';

import { makeReducer } from '../utils';

import actions from '../constants/master';

export default makeReducer((state, action) => ({
  [actions.MASTER_PHOTO_SET_MOCK]: () => {
    const { modelName, id } = action;
    const section = state.masterEditor.info;
    const model = section[modelName];
    const photos = model.items;

    photos.push({
      id,
      type: 'mock',
      status: 'upload',
    });

    state.masterEditor = {...state.masterEditor};
    state.masterEditor.info = {...section}
    state.masterEditor.info[modelName] = {...model};
    state.masterEditor.info[modelName].items = [...photos];

    return state;
  },

  [actions.MASTER_PHOTO_SET]: () => {
    const { modelName, id, sizes, mediaUrl, fileName } = action;
    const section = state.masterEditor.info;
    const model = section[modelName];
    const photos = model.items;
    const item = find(photos, { id });

    assign(item, {
      fileName,
      mediaUrl,
      sizes,
      type: 'photo',
      status: 'uploaded'
    });

    state.masterEditor = {...state.masterEditor};
    state.masterEditor.info = {...section}
    state.masterEditor.info[modelName] = {...model};
    state.masterEditor.info[modelName].items = [...photos];

    return state;
  },

  [actions.MASTER_FIELD_SET_VALUE]: () => {
    const { sectionName, modelName, value } = action;
    const section = state.masterEditor[sectionName];
    const model = section[modelName];

    model.value = value;

    state.masterEditor = {...state.masterEditor};
    state.masterEditor[sectionName] = {...section};
    state.masterEditor[sectionName][modelName] = {...model};

    return state;
  },

  [actions.MASTER_FIELD_SET_PARAM]: () => {
    const { sectionName, modelName, paramValue, paramName } = action;
    const section = state.masterEditor[sectionName];
    const model = section[modelName];

    model[paramName] = paramValue;

    state.masterEditor = {...state.masterEditor};
    state.masterEditor[sectionName] = {...section};
    state.masterEditor[sectionName][modelName] = {...model};

    return state;
  },

  [actions.MASTER_ITEM_SET_ACTIVE]: () => {
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

  [actions.MASTER_CUSTOM_DATE_PUSH]: () => {
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
