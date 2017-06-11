// @flow

import routes from '../routes';
import { post } from '../utils/provider';

type GeoAutocompleteParamsType = {
  query: string,
}

type SearchMastersParamsType = {
  type: string,
  coordinates: Array<number>,
  master_type: number,
  radius: number,
  schedule: Array<number>,
  services: Array<number>,
};

export function geoAutoComplete(params: GeoAutocompleteParamsType) {
  return post(routes.geoAutoComplete, params);
}

export function searchMasters({
  coordinates = [55.76, 37.64],
  master_type = 1,
  radius = 3000,
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
    }
  }).then(response => response.result.map(master => ({
    address: master.address.subway_station,
    closestDate: null,
    coordinates: {
      latlng: {
        latitude: master.address.coordinates[0],
        longitude: master.address.coordinates[1],
      }
    },
    distance: (master.address.distance / 1000).toFixed(2),
    id: master.id,
    isVerified: master.is_verified,
    masterType: master_type,
    photo: master.photo,
    services: [],
    title: `${master.first_name} ${master.last_name}`,
  })));
}
