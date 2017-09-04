import routes from '../routes';
import { post, patch } from '../utils/provider';

export const createMaster = (params, headers) =>
  post(routes.createMaster, params, headers)
    .then((res) => ({
      masterCardId: res.data.id,
    }));

export const createMasterServices = (params, headers) =>
  post(routes.createMasterServices, params, headers);

export const createAddress = (params, headers) =>
  post(routes.createAddress, params, headers)
    .then((res) => (res.error ? res : {
      addressId: res.data.id,
    }));

export const updateAddress = (addressId, params, headers) =>
  patch(routes.updateAddress, params, headers, { id: addressId });

export const createTimeTable = (params, headers) =>
  post(routes.createTimeTable, params, headers);

export const updateTimeTable = (timeTableId, params, headers) =>
  patch(routes.updateTimeTable, params, headers, { id: timeTableId });

export const createSchedules = (params, headers) =>
  post(routes.createSchedules, params, headers);

export default null;
