import routes from '../routes';
import { post } from '../utils/provider';

export function createMaster(params, headers) {
  return post(routes.createMaster, { user_id: 1, ...params }, headers)
    .then((response) => ({
      masterCardId: response.data.id,
    }));
}

export function createMasterServices(params, headers) {
  return post(routes.createMasterServices, params, headers);
}

export default null;
