import routes from '../routes';
import { post } from '../utils/provider';

export function geoAutoComplete(params) {
  return post(routes.geoAutoComplete, params);
}

export function searchMasters(
  coordinates = [55.76, 37.64],
  master_type = 1,
  radius = 5000,
  schedule = [],
  services = [],
) {
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
    distance: master.address.distance,
    firstName: master.first_name,
    id: master.id,
    lastName: master.last_name,
    masterType: master_type,
    photo: master.photo,
    services: [],
  })));
}
