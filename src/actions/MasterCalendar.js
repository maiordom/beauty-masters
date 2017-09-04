import * as MasterService from '../services/master';

import actions from '../constants/master';

export const createSchedules = (sectionName) => (dispatch, getState) => {
  const state = getState();
  const auth = state.auth;
  const { createSchedulesQuery, timeTableId } = state.masterEditor[sectionName];

  const params = {
    data: createSchedulesQuery,
    timetable_id: timeTableId,
  };

  if (!createSchedulesQuery.length || !timeTableId) {
    return Promise.resolve({ error: {} });
  }

  return MasterService.createSchedules(params, {
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  });
};

export const handleTimeTable = (sectionName) => (dispatch, getState) => {
  const state = getState();
  const auth = state.auth;
  const { createTimeTableQuery, timeTableId, addressId } = state.masterEditor[sectionName];

  const params = {
    data: {
      attributes: {
        ...createTimeTableQuery,
        address_id: addressId,
      },
    },
  };

  if (!addressId) {
    return Promise.resolve({ error: {} });
  }

  const handleTimeTable = (res) => {
    if (!res.error) {
      dispatch({
        type: actions.MASTER_TIME_TABLE_SET_ID,
        payload: { timeTableId: res.data.id, sectionName },
      });
    }

    return res;
  };

  const headers = {
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  };

  if (timeTableId) {
    return MasterService.updateTimeTable(timeTableId, params, headers).then(handleTimeTable);
  }

  return MasterService.createTimeTable(params, headers).then(handleTimeTable);
};

export const handleAddress = (sectionName) => (dispatch, getState) => {
  const state = getState();
  const auth = state.auth;
  const { createAddressQuery, addressId } = state.masterEditor[sectionName];

  const params = {
    data: {
      attributes: {
        ...createAddressQuery,
        master_card_id: state.masterEditor.masterCardId,
      },
    },
  };

  const handleRequest = (res) => {
    if (!res.error) {
      dispatch({
        type: actions.MASTER_ADDRESS_SET_ID,
        payload: { addressId: res.addressId, sectionName },
      });
    }

    return res;
  };

  const headers = {
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  };

  if (addressId) {
    return MasterService.updateAddress(addressId, params, headers).then(handleRequest);
  }

  return MasterService.createAddress(params, headers).then(handleRequest);
};
