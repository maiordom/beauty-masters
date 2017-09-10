import routes from '../routes';
import { post } from '../utils/Provider';

export function getFavorites(params) {
  return post(routes.userFavorites, params);
}

export default null;
