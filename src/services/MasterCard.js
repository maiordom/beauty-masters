// @flow

import routes from '../routes';
import { get } from '../utils/Provider';

const getPhotos = (included, type) =>
  included.filter(item => item.type === type).map(photo => ({
    sizes: {
      l: photo.attributes.image.l,
      m: photo.attributes.image.m,
      s: photo.attributes.image.s,
    }
  }));

const getServices = (included) =>
  included.filter(item => item.type === 'master-service').map(service => ({
    duration: service.attributes.duration,
    price: service.attributes.price,
    serviceId: service.attributes.service_id,
  }));

export const getMasterById = (id: number) =>
  get(routes.getMasterById, {
    include: 'addresses,master_services,master_photos,certificate_photos,portfolio_photos'
  }, null, { id }).then((res: Object) => (res.error ? res : {
    addresses: [],
    id: res.data.id,
    inProfile: res.data.attributes.in_profile,
    isSalon: Boolean(res.data.attributes.is_salon),
    masterPhotos: res.included ? getPhotos(res.included, 'master-photo') : [],
    phone: res.data.attributes.phone,
    salonName: res.data.attributes.salon_name,
    services: res.included ? getServices(res.included) : [],
    username: res.data.attributes.full_name,
    vkProfile: res.data.attributes.vk_profile,
    workPhotos: res.included ? getPhotos(res.included, 'portfolio-photo') : [],
  }));

export default null;
