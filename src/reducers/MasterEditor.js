import find from 'lodash/find';
import assign from 'lodash/assign';
import reject from 'lodash/reject';
import each from 'lodash/each';

import { makeReducer, deepUpdate } from '../utils';
import { getCleanMasterEditorObject } from '../store/MasterEditor';

import actions from '../constants/Master';

import {
  setCreateQueryParam,
  setItemById,
  setParam,
  setScheduleQuery,
} from './MasterEditorHelpers';

export default makeReducer((state, action) => ({
  [actions.MASTER_EDITOR_REFRESH]: (state) => {
    const cleanMasterEditorObject = getCleanMasterEditorObject();

    each(cleanMasterEditorObject, (key: string) => {
      state.masterEditor[key] = cleanMasterEditorObject[key];
    });

    return state;
  },

  [actions.MASTER_CARD_ID_SET]: (state, { payload: { masterCardId } }) => {
    state.masterEditor.masterCardId = masterCardId;

    return state;
  },

  [actions.MASTER_PHOTO_SET_MOCK]: () => {
    const { modelName, id, status } = action;
    const { items } = state.masterEditor.info[modelName];
    const item = find(items, { id });

    if (item) {
      assign(item, { status });
    } else {
      items.push({ id, status, type: 'mock' });
    }

    return deepUpdate(state, `masterEditor.info.${modelName}`, {
      items: [...items],
    });
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
    const { modelName, id, sizes, mediaFileId } = action;
    const { items } = state.masterEditor.info[modelName];
    const item = find(items, { id });

    assign(item, {
      mediaFileId,
      sizes,
      type: 'photo',
      status: 'uploaded',
    });

    return deepUpdate(state, `masterEditor.info.${modelName}`, {
      items: [...items],
    });
  },

  [actions.MASTER_PHOTO_REMOVE]: () => {
    const { itemId, modelName } = action;
    let { items } = state.masterEditor.info[modelName];

    items = reject(items, { id: itemId });

    return deepUpdate(state, `masterEditor.info.${modelName}`, {
      items: [...items],
    });
  },

  [actions.MASTER_GENERAL_SET_PARAM]: () => {
    const { sectionName, modelName, value } = action;
    const model = state.masterEditor[sectionName][modelName];

    state = deepUpdate(state, `masterEditor.${sectionName}.${modelName}`, { value });

    if (model.queryParam) {
      const queryValue = model.valueType === 'number' ? Number(value) : value;
      state.masterEditor.createMasterQuery[model.queryParam] = queryValue;
    }

    return state;
  },

  [actions.MASTER_CALENDAR_INTERVAL_SET]: () => {
    setItemById(action.payload, state);
    setCreateQueryParam(action.payload, state, 'createTimeTableQuery');

    return state;
  },

  [actions.MASTER_CALENDAR_SCHEDULE_SET]: (state, { payload: { modelName, changes, sectionName } }) => {
    const items = state.masterEditor[sectionName][modelName].items;
    const item = find(items, { date: changes.date });

    if (item) {
      Object.assign(item, changes);
    } else {
      items.push(changes);
    }

    setScheduleQuery({ modelName, changes, sectionName }, state, changes);

    return deepUpdate(state, `masterEditor.${sectionName}.${modelName}`, { items: [...items] });
  },

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

  [actions.MASTER_ADDRESS_SET_ID]: (state, { payload: { sectionName, addressId } }) =>
    deepUpdate(state, `masterEditor.${sectionName}`, { addressId }),

  [actions.MASTER_TIME_TABLE_SET_ID]: (state, { payload: { sectionName, timeTableId } }) =>
    deepUpdate(state, `masterEditor.${sectionName}`, { timeTableId }),
}));
