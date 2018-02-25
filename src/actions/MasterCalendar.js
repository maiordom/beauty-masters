import * as MasterService from '../services/Master';

import actions from '../constants/Master';

export const createSchedules = (sectionName) => (dispatch, getState) => {
  const state = getState();
  const { auth } = state;
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
  }).then((res) => {
    if (res.status === 'success') {
      dispatch({
        type: actions.MASTER_CALENDAR_SCHEDULE_STATUS_SET,
        payload: { sectionName, status: true },
      });
    }

    return res;
  });
};

export const handleTimeTable = (sectionName) => (dispatch, getState) => {
  const state = getState();
  const { auth } = state;
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

  const handleResponse = (res) => {
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
    return MasterService.updateTimeTable(timeTableId, params, headers).then(handleResponse);
  }

  return MasterService.createTimeTable(params, headers).then(handleResponse);
};

export const handleAddress = (sectionName) => (dispatch, getState) => {
  const state = getState();
  const { auth } = state;
  const { createAddressQuery, addressId } = state.masterEditor[sectionName];

  const params = {
    data: {
      attributes: {
        ...createAddressQuery,
        master_card_id: state.masterEditor.masterCardId,
      },
    },
  };

  const handleResponse = (res) => {
    if (!res.error) {
      dispatch({
        type: actions.MASTER_ADDRESS_SET_ID,
        payload: { addressId: res.data.id, sectionName },
      });
    }

    return res;
  };

  const headers = {
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  };

  if (addressId) {
    return MasterService.updateAddress(addressId, params, headers).then(handleResponse);
  }

  return MasterService.createAddress(params, headers).then(handleResponse);
};
