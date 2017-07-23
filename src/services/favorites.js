import routes from '../routes';
import { post } from '../utils/provider';

export function getFavorites(params) {
  return post(routes.userFavorites, params);
}
