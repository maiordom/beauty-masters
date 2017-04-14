import find from 'lodash/find';
import each from 'lodash/each';
import assign from 'lodash/assign';
import reject from 'lodash/reject';

import { makeReducer } from '../utils';

import actions from '../constants/master';

const setParam = (action, state) => {
  const { sectionName, modelName, paramValue, paramName } = action;
  const section = state.masterEditor[sectionName];
  const model = section[modelName];

  model[paramName] = paramValue;

  state.masterEditor = { ...state.masterEditor };
  state.masterEditor[sectionName] = { ...section };
  state.masterEditor[sectionName][modelName] = { ...model };
};

const setItemById = (action, state) => {
  const { modelName, id, sectionName } = action;
  const section = state.masterEditor[sectionName];
  const model = section[modelName];

  each(model.items, item => {
    item.active = item.id === id;

    if (item.active) {
      model.selected = item;
    }
  });

  state.masterEditor = { ...state.masterEditor };
  state.masterEditor[sectionName] = { ...section };
  state.masterEditor[sectionName][modelName] = { ...model };
  state.masterEditor[sectionName][modelName].items = [...model.items];
};

const setCalendarParam = (action, state) => {
  const createMasterQuery = state.masterEditor.createMasterQuery;
  const section = state.masterEditor[action.sectionName];
  const model = section[action.modelName];
  let calendarSettingsObject = createMasterQuery.address[section.index];

  if (!calendarSettingsObject) {
    calendarSettingsObject = {
      recipients: {
        custom_recipients: [],
      },
    };
    createMasterQuery.address[section.index] = calendarSettingsObject;
  }

  if (model.parentQueryParam) {
    calendarSettingsObject[model.parentQueryParam][model.queryParam] = action.paramValue;
  } else {
    calendarSettingsObject[model.queryParam] = action.paramValue;
  }
};

const setCalendarRecipientDate = (action, state) => {
  const createMasterQuery = state.masterEditor.createMasterQuery;
  const section = state.masterEditor[action.sectionName];
  const model = section[action.modelName];
  let calendarSettingsObject = createMasterQuery.address[section.index];

  if (!calendarSettingsObject) {
    calendarSettingsObject = {
      recipients: {
        custom_recipients: [],
      },
    };
    createMasterQuery.address[section.index] = calendarSettingsObject;
  }

  const dates = calendarSettingsObject[model.parentQueryParam][model.queryParam];
  const date = find(dates, action.date);

  if (date) {
    assign(date, action.date);
  } else {
    dates.push(action.date);
  }
};

export default makeReducer((state, action) => ({
  [actions.MASTER_PHOTO_SET_MOCK]: () => {
    const { modelName, id } = action;
    const section = state.masterEditor.info;
    const model = section[modelName];
    const { items } = model;

    items.push({
      id,
      type: 'mock',
      status: 'upload',
    });

    state.masterEditor = { ...state.masterEditor };
    state.masterEditor.info = { ...section };
    state.masterEditor.info[modelName] = { ...model };
    state.masterEditor.info[modelName].items = [...items];

    return state;
  },

  [actions.MASTER_PHOTO_SET]: () => {
    const { modelName, id, sizes, mediaUrl, fileName } = action;
    const section = state.masterEditor.info;
    const model = section[modelName];
    const { items } = model;
    const item = find(items, { id });

    assign(item, {
      fileName,
      mediaUrl,
      sizes,
      type: 'photo',
      status: 'uploaded'
    });

    state.masterEditor = { ...state.masterEditor };
    state.masterEditor.info = { ...section };
    state.masterEditor.info[modelName] = { ...model };
    state.masterEditor.info[modelName].items = [...items];

    return state;
  },

  [actions.MASTER_PHOTO_REMOVE]: () => {
    const { itemId, modelName } = action;
    const section = state.masterEditor.info;
    const model = section[modelName];
    const items = reject(model.items, { id: itemId });

    state.masterEditor = { ...state.masterEditor };
    state.masterEditor.info = { ...section };
    state.masterEditor.info[modelName] = { ...model };
    state.masterEditor.info[modelName].items = items;

    return state;
  },

  [actions.MASTER_FIELD_SET_VALUE]: () => {
    const { sectionName, modelName, value } = action;
    const section = state.masterEditor[sectionName];
    const model = section[modelName];

    model.value = value;

    state.masterEditor = { ...state.masterEditor };
    state.masterEditor[sectionName] = { ...section };
    state.masterEditor[sectionName][modelName] = { ...model };

    if (model.queryParam) {
      state.masterEditor.createMasterQuery[model.queryParam] = value;
    }

    return state;
  },

  [actions.MASTER_FIELD_SET_PARAM]: () => {
    setParam(action, state);

    return state;
  },

  [actions.MASTER_SERVICE_TOOGLE]: () => {
    setParam(action, state);

    const createMasterQuery = state.masterEditor.createMasterQuery;
    const model = state.masterEditor[action.sectionName][action.modelName];

    if (action.paramValue) {
      const service = { service_id: model.id };
      createMasterQuery.services.push(service);
    } else {
      createMasterQuery.services = reject(createMasterQuery.services, { service_id: model.id });
    }

    return state;
  },

  [actions.MASTER_SERVICE_SET_PARAM]: () => {
    setParam(action, state);

    const createMasterQuery = state.masterEditor.createMasterQuery;
    const model = state.masterEditor[action.sectionName][action.modelName];
    const service = find(createMasterQuery.services, { service_id: model.id });

    service[action.paramName] = action.paramValue;

    return state;
  },

  [actions.MASTER_CALENDAR_SET_INTERVAL]: () => {
    setItemById(action, state);
    setCalendarParam(action, state);

    return state;
  },

  [actions.MASTER_CALENDAR_SET_RECIPIENT_DATE]: () => {
    const { sectionName, changes, modelName } = action;
    const { timeStart, timeEnd, date, workInThisDay } = changes;
    const section = state.masterEditor[sectionName];
    const model = section[modelName];

    const dateObject = {
      date,
      status: workInThisDay,
      timeEnd,
      timeStart,
    };
    const dateCurrent = find(model.items, { date });

    if (dateCurrent) {
      Object.assign(dateCurrent, dateObject);
    } else {
      model.items.push(dateObject);
    }

    state.masterEditor = { ...state.masterEditor };
    state.masterEditor[sectionName] = { ...section };
    state.masterEditor[sectionName][modelName] = { ...model };
    state.masterEditor[sectionName][modelName].items = [...model.items];

    const recipientDate = {};

    each(dateObject, (value, key) => {
      recipientDate[model.queryParamMapping[key]] = value;
    });

    setCalendarRecipientDate({
      date: recipientDate,
      ...action,
    }, state);

    return state;
  },

  [actions.MASTER_CALENDAR_SET_PARAM]: () => {
    setParam(action, state);
    setCalendarParam(action, state);

    return state;
  }
}), null, state => {
  console.log(state.masterEditor.createMasterQuery);
});
