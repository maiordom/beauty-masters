
// @flow
import isEmpty from 'lodash/isEmpty';

import routes from '../routes';
import { get } from '../utils/Provider';

import type { TCity } from '../types/City';

export const mapGetCityResponse = (data): Array<TCity> => data.map(city => ({
  id: Number(city.id),
  name: city.attributes.name,
  lat: city.attributes.lat,
  lon: city.attributes.lon,
  hasSubway: !isEmpty(city.relationships.subway_stations.data),
}: TCity));

export function getCities() {
  return get(routes.getCities)
    .then((res = {}) => (res.data && {
      cities: mapGetCityResponse(res.data),
    } || {
        cities: [],
      }));
}
