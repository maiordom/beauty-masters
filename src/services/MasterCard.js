// @flow

import routes from '../routes';
import { get } from '../utils/Provider';

const getPhotos = (included, type) =>
  included.filter(item => item.type === type).map(photo => ({
    id: photo.id,
    mediaFileId: photo.attributes.media_file_id,
    sizes: {
      l: photo.attributes.image.l,
      m: photo.attributes.image.m,
      s: photo.attributes.image.s,
    },
  }));

const getServices = (included) =>
  included.filter(item => item.type === 'master-service').map((service) => {
    const masterService = {
      categoryId: service.attributes.category_service_id,
      duration: Number(service.attributes.duration),
      price: Number(service.attributes.price),
      serviceId: service.attributes.service_id,
    };

    if (masterService.serviceId === null) {
      masterService.title = service.attributes.title;
    }

    return masterService;
  });

export const getMasterById = (id: number) =>
  get(routes.getMasterById, {
    include: 'addresses,master_services,master_photos,certificate_photos,portfolio_photos',
  }, null, { id }).then((res: Object) => (res.error ? res : {
    addresses: [],
    certificatePhotos: res.included ? getPhotos(res.included, 'certificate-photo') : [],
    id: res.data.id,
    inProfile: res.data.attributes.in_profile,
    isSalon: Boolean(res.data.attributes.is_salon),
    masterPhotos: res.included ? getPhotos(res.included, 'master-photo') : [],
    phone: /\d/.test(res.data.attributes.phone[0])
      ? '+' + res.data.attributes.phone
      : res.data.attributes.phone,
    salonName: res.data.attributes.salon_name,
    services: res.included ? getServices(res.included) : [],
    username: res.data.attributes.full_name,
    vkProfile: res.data.attributes.vk_profile,
    workPhotos: res.included ? getPhotos(res.included, 'portfolio-photo') : [],
  }));

export default null;
