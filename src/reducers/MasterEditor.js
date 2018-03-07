import assign from 'lodash/assign';
import filter from 'lodash/filter';
import find from 'lodash/find';
import lowerCase from 'lodash/lowerCase';
import reject from 'lodash/reject';
import sortBy from 'lodash/sortBy';
import startsWith from 'lodash/startsWith';

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

    Object.keys(cleanMasterEditorObject).forEach((key: string) => {
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

  [actions.MASTER_PHOTO_SET]: (state, {
    payload: {
      modelName, id, originalId, sizes, mediaFileId,
    },
  }) => {
    const { items } = state.masterEditor.info[modelName];
    const item = find(items, { id });

    assign(item, {
      id: originalId,
      mediaFileId,
      sizes,
      status: 'uploaded',
      type: 'photo',
    });

    return deepUpdate(state, `masterEditor.info.${modelName}`, {
      items: [...items],
    });
  },

  [actions.MASTER_PHOTO_REMOVE]: (state, { payload: { id, modelName } }) => {
    let { items } = state.masterEditor.info[modelName];

    items = reject(items, { id });

    return deepUpdate(state, `masterEditor.info.${modelName}`, {
      items: [...items],
    });
  },

  [actions.MASTER_GENERAL_PARAM_SET]: (state, { sectionName, modelName, value }) => {
    const model = state.masterEditor[sectionName][modelName];

    state = deepUpdate(state, `masterEditor.${sectionName}.${modelName}`, { value });

    if (model.queryParam) {
      const queryValue = model.valueType === 'number' ? Number(value) : value;
      state.masterEditor.createMasterQuery[model.queryParam] = queryValue;
    }

    return state;
  },

  [actions.MASTER_GENERAL_PHONE_SET]: (state, { payload: { sectionName, modelName, value } }) => {
    const model = state.masterEditor[sectionName][modelName];

    state = deepUpdate(state, `masterEditor.${sectionName}.${modelName}`, { value });

    return deepUpdate(state, 'masterEditor.createMasterQuery', {
      [model.queryParam]: `7${value}`,
    });
  },

  [actions.MASTER_CALENDAR_INTERVAL_SET]: () => {
    setItemById(action.payload, state);
    setCreateQueryParam(action.payload, state, 'createTimeTableQuery');

    return state;
  },

  [actions.MASTER_CALENDAR_SCHEDULE_SET]: (state, { payload: { modelName, changes, sectionName } }) => {
    const { items } = state.masterEditor[sectionName][modelName];
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

  [actions.MASTER_CUSTOM_DATES_SET_PARAM]: (state, { payload }) => {
    setParam(payload, state);
    return state;
  },

  [actions.MASTER_ADDRESS_SET_ID]: (state, { payload: { sectionName, addressId } }) =>
    deepUpdate(state, `masterEditor.${sectionName}`, { addressId }),

  [actions.MASTER_TIME_TABLE_SET_ID]: (state, { payload: { sectionName, timeTableId } }) =>
    deepUpdate(state, `masterEditor.${sectionName}`, { timeTableId }),

  [actions.MASTER_CALENDAR_SCHEDULE_STATUS_SET]: (state, { payload: { sectionName, status } }) =>
    deepUpdate(state, `masterEditor.${sectionName}`, { schedulesCreated: status }),

  [actions.MASTER_CITY_MODEL_SET]: (state, { payload: { cities } }) => {
    ['calendarSettingsOne', 'calendarSettingsTwo', 'calendarSettingsThree'].forEach((key: string, index: number) => {
      const cityName = state.masterEditor[key].cityField.value;
      let selectedCity = null;
      if (cityName) {
        selectedCity = find(state.geo.cities, { name: cityName });
      }

      deepUpdate(state, `masterEditor.${key}.cities`, {
        items: cities,
        filtered: null,
        selected: selectedCity,
      });
    });

    return state;
  },

  [actions.MASTER_CITY_FIND]: (state, { payload: { text, modelName } }) => {
    const { cities } = state.masterEditor[modelName];
    const filtered = filter(cities.items, (city) => (
      startsWith(lowerCase(city.name), lowerCase(text))));

    return deepUpdate(state, `masterEditor.${modelName}.cities`, { filtered });
  },

  [actions.MASTER_CITY_SET]: (state, { payload: { id, modelName } }) => {
    const { cities } = state.masterEditor[modelName];
    const selected = cities.items.find((city) => city.id === id);

    if (!state.masterEditor[modelName].addressField.value) {
      deepUpdate(state, `masterEditor.${modelName}.createAddressQuery`, {
        lat: selected.lat,
        lon: selected.lon,
      });
    }

    deepUpdate(state, `masterEditor.${modelName}.cities`, { selected });
    deepUpdate(state, `masterEditor.${modelName}.cityField`, { value: selected.name });
    deepUpdate(state, `masterEditor.${modelName}.subwayStationField`, { value: null });
    deepUpdate(state, `masterEditor.${modelName}.subwayStations`, {
      selected: null,
      items: [],
      filtered: null,
    });
    deepUpdate(state, `masterEditor.${modelName}.createAddressQuery`, { city: selected.name, subway_station: null });

    return state;
  },

  [actions.MASTER_SUBWAY_STATION_MODEL_SET]: (state, { payload: { modelName, subwayStations } }) => (
    deepUpdate(state, `masterEditor.${modelName}.subwayStations`, {
      items: sortBy(subwayStations, 'name'),
      filtered: null,
    })
  ),

  [actions.MASTER_SUBWAY_STATION_FIND]: (state, { payload: { text, modelName } }) => {
    const { subwayStations } = state.masterEditor[modelName];
    const filtered = filter(subwayStations.items, (station) => (
      startsWith(lowerCase(station.name), lowerCase(text))));

    return deepUpdate(state, `masterEditor.${modelName}.subwayStations`, { filtered });
  },

  [actions.MASTER_SUBWAY_STATION_SET]: (state, { payload: { id, modelName } }) => {
    const { subwayStations } = state.masterEditor[modelName];
    const selected = subwayStations.items.find((station) => station.id === id);

    deepUpdate(state, `masterEditor.${modelName}.subwayStations`, { selected });
    deepUpdate(state, `masterEditor.${modelName}.subwayStationField`, { value: selected.name });
    deepUpdate(state, `masterEditor.${modelName}.createAddressQuery`, {
      subway_station: selected.name,
    });

    return state;
  },
}));
