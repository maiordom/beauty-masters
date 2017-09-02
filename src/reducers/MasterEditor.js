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

  each(model.items, (item) => {
    item.active = item.id === id;

    if (item.active) {
      model.selected = item;
    }
  });

  deepUpdate(state, `masterEditor.${sectionName}.${modelName}`, {
    items: [...model.items],
  });
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

const setCreateQueryParam = (payload, state, createType) => {
  const { sectionName, modelName, paramValue } = payload;
  const section = state.masterEditor[sectionName];
  const model = section[modelName];
  const query = section[createType];

  query[model.queryParam] = paramValue;
};

export default makeReducer((state, action) => ({
  [actions.MASTER_CARD_SET_ID]: () => {
    state.masterEditor.masterCardId = action.masterCardId;

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
    setItemById(action.payload, state);
    setCreateQueryParam(action.payload, state, 'createTimeTableQuery');

    return state;
  },

  [actions.MASTER_CALENDAR_SET_RECIPIENT_DATE]: () => (state),

  [actions.MASTER_LOCATION_SET]: () => {
    const { location, sectionName } = action.payload;
    const { createAddressQuery } = state.masterEditor[sectionName];

    createAddressQuery.lat = location.lat;
    createAddressQuery.lon = location.lng;

    return state;
  },

  [actions.MASTER_PLACE_SET]: () => {
    setParam(action.payload, state);
    setCreateQueryParam(action.payload, state, 'createAddressQuery');

    return state;
  },

  [actions.MASTER_ADDRESS_SET_PARAM]: () => {
    setParam(action.payload, state);
    setCreateQueryParam(action.payload, state, 'createAddressQuery');

    return state;
  },

  [actions.MASTER_TIME_TABLE_SET_PARAM]: () => {
    setParam(action.payload, state);
    setCreateQueryParam(action.payload, state, 'createTimeTableQuery');

    return state;
  },
}));
