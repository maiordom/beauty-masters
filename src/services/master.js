import routes from '../routes';
import { post } from '../utils/provider';

export function createMaster(params) {
  return post(routes.createMaster, params);
}
