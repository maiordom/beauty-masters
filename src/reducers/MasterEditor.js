import find from 'lodash/find';
import each from 'lodash/each';
import assign from 'lodash/assign';
import reject from 'lodash/reject';

import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/master';

import { setParam } from './MasterEditorHelpers';

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
  let calendarSettingsObject = createMasterQuery.master_addresses[section.index];

  if (!calendarSettingsObject) {
    calendarSettingsObject = {
      custom_recipients: [],
    };
    createMasterQuery.master_addresses[section.index] = calendarSettingsObject;
  }

  calendarSettingsObject[model.queryParam] = action.paramValue;
};

const setCalendarRecipientDate = (action, state) => {
  const createMasterQuery = state.masterEditor.createMasterQuery;
  const section = state.masterEditor[action.sectionName];
  const model = section[action.modelName];
  let calendarSettingsObject = createMasterQuery.master_addresses[section.index];

  if (!calendarSettingsObject) {
    calendarSettingsObject = {
      custom_recipients: [],
    };
    createMasterQuery.master_addresses[section.index] = calendarSettingsObject;
  }

  const dates = calendarSettingsObject[model.queryParam];
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
  [actions.MASTER_LOCATION_SET]: () => (state),

  [actions.MASTER_PLACE_SET]: () => {
    const { place, modelName } = action;

    return deepUpdate(state, `masterEditor.${modelName}.addressField`, {
      value: place.label,
    });
  },

  [actions.MASTER_CARD_SET_ID]: () => {
    state.masterEditor.masterCardId = action.masterCardId;

    return state;
  },

  [actions.MASTER_DATA_SET]: () => {
    const { data } = action;
    const { services, master_addresses } = data;
    const {
      calendarSettingsOne,
      calendarSettingsThree,
      calendarSettingsTwo,
      generalSection,
      handlingTools,
      serviceManicure,
      servicePedicure,
    } = state.masterEditor;

    const calendarsMapping = [
      calendarSettingsOne,
      calendarSettingsTwo,
      calendarSettingsThree,
    ];

    each(master_addresses, (addressItem, index) => {
      const calendarObject = calendarsMapping[index];

      each(calendarObject, calendarModel => {
        const {
          queryAction,
          queryParam,
          queryType,
        } = calendarModel;

        if (queryType === 'value') {
          calendarModel.value = addressItem[queryParam];
        }

        if (queryType === 'items' && queryAction === 'fill') {
          const items = addressItem[queryParam];

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
            item.active = item.id === addressItem[queryParam];

            if (item.active) {
              calendarModel.selected = item;
            }
          });
        }
      });
    });

    each(generalSection, (model, key) => {
      if (model.queryParam in data) {
        model.value = data[model.queryParam];
        generalSection[key] = { ...model };
      }
    });

    each(services, service => {
      each(serviceManicure, (model, key) => {
        if (model.id === service.service_id) {
          model.active = true;
          model.price = service.price;
          model.duration = service.duration;

          serviceManicure[key] = { ...model };
        }
      });

      each(servicePedicure, (model, key) => {
        if (model.id === service.service_id) {
          model.active = true;
          model.price = service.price;
          model.duration = service.duration;

          servicePedicure[key] = { ...model };
        }
      });

      each(handlingTools, model => {
        if (model.id === service.service_id) {
          model.value = true;
        }
      });
    });

    const { services: masterQueryServices } = state.masterEditor.createMasterQuery;

    masterQueryServices.forEach(({ service_id }) => {
      if (!find(data.services, { service_id })) {
        data.services.push({ service_id });
      }
    });

    state.masterEditor.createMasterQuery = data;
    state.masterEditor = { ...state.masterEditor };
    state.masterEditor.generalSection = { ...generalSection };
    state.masterEditor.serviceManicure = { ...serviceManicure };

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
      status: 'uploaded',
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
    const model = state.masterEditor[sectionName][modelName];

    state = deepUpdate(state, `masterEditor.${sectionName}.${modelName}`, { value });

    if (model.queryParam) {
      const queryValue = model.valueType === 'number' ? Number(value) : value;
      state.masterEditor.createMasterQuery[model.queryParam] = queryValue;
    }

    return state;
  },

  [actions.MASTER_FIELD_SET_PARAM]: () => {
    setParam(action, state);

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
  },
}));
