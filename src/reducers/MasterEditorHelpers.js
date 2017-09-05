import each from 'lodash/each';
import find from 'lodash/find';

import { deepUpdate } from '../utils';

export const setParam = (action, state) => {
  const { sectionName, modelName, paramValue, paramName } = action;
  const section = state.masterEditor[sectionName];
  const model = section[modelName];

  model[paramName] = paramValue;

  state.masterEditor = { ...state.masterEditor };
  state.masterEditor[sectionName] = { ...section };
  state.masterEditor[sectionName][modelName] = { ...model };
};

export const setItemById = (action, state) => {
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

export const setCreateQueryParam = ({ sectionName, modelName, paramValue }, state, createType) => {
  const section = state.masterEditor[sectionName];
  const model = section[modelName];
  const query = section[createType];

  query[model.queryParam] = paramValue;
};

export const setScheduleQuery = ({ sectionName }, state, changes) => {
  const query = state.masterEditor[sectionName].createSchedulesQuery;
  const item = find(query, (item => item.attributes.date === changes.date));

  const scheduleItem = {
    is_not_work: Number(!changes.workInThisDay),
    date: changes.date,
    time_start: changes.timeStart,
    time_end: changes.timeEnd,
  };

  if (item) {
    Object.assign(item.attributes, scheduleItem);
  } else {
    query.push({
      attributes: scheduleItem,
    });
  }
};

export default null;
