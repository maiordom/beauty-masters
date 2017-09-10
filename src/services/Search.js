// @flow

import routes from '../routes';
import { post } from '../utils/Provider';

import type { SearchMastersParamsType } from '../types/SearchFormTypes';

type GeoAutocompleteParamsType = {
  query: string,
}

export function geoAutoComplete(params: GeoAutocompleteParamsType) {
  return post(routes.geoAutoComplete, params);
}

export function searchMasters({
  coordinates = [55.76, 37.64],
  // eslint-disable-next-line
  master_type = 1,
  radius = 3500,
  schedule = [],
  services = [],
}: SearchMastersParamsType) {
  return post(routes.searchMasters, {
    type: 'map',
    query: {
      coordinates,
      master_type,
      radius,
      schedule,
      services,
    },
  })
  .then(response => response.result && response.result.map(master => ({
    address: master.address.subway_station,
    closestDate: master.address.closest_date,
    coordinates: {
      latitude: master.address.coordinates[0],
      longitude: master.address.coordinates[1],
    },
    distance: (master.address.distance / 1000).toFixed(2),
    id: master.id,
    isVerified: master.is_verified,
    masterType: master_type,
    photo: master.photo,
    services: master.services.slice(0, 3).map(({ duration, id, price }) => ({
      duration,
      id,
      price,
    })),
    username: master.username
  })) || []);
}
