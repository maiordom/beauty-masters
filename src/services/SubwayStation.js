// @flow
import routes from '../routes';
import { get } from '../utils/Provider';

import type { TSubwayStation } from '../types/SubwayStation';

const mapResponse = (data): Array<TSubwayStation> => data.map(station => ({
  id: Number(station.id),
  name: station.attributes.name,
  cityId: station.attributes.city_id,
  line: station.attributes.line,
  color: station.attributes.color,
}: TSubwayStation));

export function getSubwayStations(cityId: number) {
  const params = {
    page: {
      number: 1,
      size: 250
    },
    filters: `[{"operator": "=", "attribute": "city_id", "value": ${cityId}}]`
  };
  return get(routes.getSubwayStations, params)
    .then((res = {}) => {
      if (res.data) {
        return { subwayStations: mapResponse(res.data) };
      } else {
        return { subwayStations: [] };
      }
    });
}
