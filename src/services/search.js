import routes from '../routes';
import { post } from '../utils/provider';

export function geoAutoComplete(params) {
  return post(routes.geoAutoComplete, params);
}
