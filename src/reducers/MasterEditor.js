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

const setPhotoParam = (state, model, fileName) => {
  const createMasterQuery = state.masterEditor.createMasterQuery;
  const { queryType, queryParam } = model;

  if (queryType === 'array') {
    createMasterQuery[queryParam].push(fileName);
  } else {
    createMasterQuery[queryParam] = fileName;
  }
};

const removePhotoParam = (state, model, fileName) => {
  const createMasterQuery = state.masterEditor.createMasterQuery;
  const { queryType, queryParam } = model;

  if (queryType === 'array') {
    createMasterQuery[queryParam] = reject(createMasterQuery[queryParam], value => (value === fileName));
  } else {
    createMasterQuery[queryParam] = fileName;
  }
};

export default makeReducer((state, action) => ({
  [actions.MASTER_DATA_SET]: () => {
    const { data } = action;
    const { services, address } = data;
    const {
      calendarSettingsOne,
      calendarSettingsThree,
      calendarSettingsTwo,
      generalSection,
      handlingTools,
      info,
      serviceManicure,
      servicePedicure,
    } = state.masterEditor;

    const calendarsMapping = [
      calendarSettingsOne,
      calendarSettingsTwo,
      calendarSettingsThree,
    ];

    each(address, (addressItem, index) => {
      const calendarObject = calendarsMapping[index];

      each(calendarObject, calendarModel => {
        const {
          parentQueryParam,
          queryAction,
          queryParam,
          queryType,
        } = calendarModel;

        if (queryType === 'value') {
          if (parentQueryParam) {
            calendarModel.value = addressItem[parentQueryParam][queryParam];
          } else {
            calendarModel.value = addressItem[queryParam];
          }
        }

        if (queryType === 'items' && queryAction === 'fill') {
          const items = addressItem[parentQueryParam][queryParam];

          each(items, item => {
            const object = {};

            Object.keys(item).forEach(key => {
              object[calendarModel.fromQueryParamMapping[key]] = item[key];
            });

            calendarModel.items.push(object);
          });
        }

        if (queryType === 'items' && queryAction === 'select') {
          calendarModel.items.forEach(item => {
            item.active = item.id === addressItem[parentQueryParam][queryParam];

            if (item.active) {
              calendarModel.selected = item;
            }
          });
        }
      });
    });

    each(generalSection, model => {
      if (model.queryParam in data) {
        model.value = data[model.queryParam];
      }
    });

    each(services, service => {
      each(serviceManicure, model => {
        if (model.id === service.service_id) {
          model.active = true;
          model.price = service.price;
          model.duration = service.duration;
        }
      });

      each(servicePedicure, model => {
        if (model.id === service.service_id) {
          model.active = true;
          model.price = service.price;
          model.duration = service.duration;
        }
      });

      each(handlingTools, model => {
        if (model.id === service.service_id) {
          model.value = true;
        }
      });
    });

    state.masterEditor.createMasterQuery = data;

    return state;
  },

  [actions.MASTER_PHOTO_SET_MOCK]: () => {
    const { modelName, id, status } = action;
    const section = state.masterEditor.info;
    const model = section[modelName];
    const { items } = model;
    const item = find(items, { id });

    if (item) {
      assign(item, { status });
    } else {
      items.push({ id, status, type: 'mock' });
    }

    state.masterEditor = { ...state.masterEditor };
    state.masterEditor.info = { ...section };
    state.masterEditor.info[modelName] = { ...model };
    state.masterEditor.info[modelName].items = [...items];

    return state;
  },

  [actions.MASTER_PHOTO_SET_QUEUE]: () => {
    const { modelName, id, fileData } = action;
    const queue = state.masterEditor.info.photosQueue.items;

    queue.push({ modelName, id, fileData });

    return state;
  },

  [actions.MASTER_PHOTO_REMOVE_QUEUE]: () => {
    const { id } = action;
    const queueModel = state.masterEditor.info.photosQueue;
    const queue = queueModel.items;

    queueModel.items = reject(queue, { id });

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

    setPhotoParam(state, model, fileName);

    return state;
  },

  [actions.MASTER_PHOTO_REMOVE]: () => {
    const { itemId, modelName } = action;
    const section = state.masterEditor.info;
    const model = section[modelName];
    let { items } = model;
    const { fileName } = find(items, { id: itemId });

    items = reject(items, { id: itemId });

    state.masterEditor = { ...state.masterEditor };
    state.masterEditor.info = { ...section };
    state.masterEditor.info[modelName] = { ...model };
    state.masterEditor.info[modelName].items = items;

    removePhotoParam(state, model, fileName);

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
  console.log(state.masterEditor.calendarSettingsOne);
});
