// @flow

import routes from '../routes';
import { post, get } from '../utils/Provider';

export function geoAutoComplete(params: Object) {
  return post(routes.geoAutoComplete, params);
}

export function searchMasters(params: { query: string }) {
  return get(routes.searchMasters, params)
  .then((res: Object) => (res.error ? res : res.data.map(master => ({
    address: master.attributes.address,
    closestDate: master.attributes.closest_date,
    coordinates: {
      latitude: master.attributes.lat,
      longitude: master.attributes.lon,
    },
    id: master.id,
    isSalon: master.attributes.is_salon,
    photo: master.attributes.avatar,
    services: master.attributes.master_services.map(({ duration, id, price, title }) => ({
      duration,
      id,
      price,
      title,
    })),
    username: master.attributes.full_name,
  })) || []));
}
