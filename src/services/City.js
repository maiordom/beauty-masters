
// @flow
import routes from '../routes';
import { get } from '../utils/Provider';

import type { TCity } from '../types/City';

const mapResponse = (data): Array<TCity> => data.map(city => ({
  id: Number(city.id),
  name: city.attributes.name,
  lat: city.attributes.lat,
  lon: city.attributes.lon,
}: TCity));

export function getCities() {
  return get(routes.getCities)
    .then(res => (res.data && {
      cities: mapResponse(res.data),
    } || {
        cities: [],
      }));
}
