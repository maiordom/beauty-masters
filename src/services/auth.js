import routes from '../routes';
import { post } from '../utils/provider';

export function registerUser(params) {
  return post(routes.registerUser, params);
}
