// @flow

import routes from '../routes';
import { get } from '../utils/Provider';

export const getMasterById = (id: number) =>
  get(routes.getMasterById, {
    include: 'addresses,master_services,master_photos,certificate_photos,portfolio_photos'
  }, null, { id }).then((res: Object) => (res.error ? res : {
    id: res.data.id,
    inProfile: res.data.attributes.in_profile,
    isSalon: Boolean(res.data.attributes.is_salon),
    phone: res.data.attributes.phone,
    salonName: res.data.attributes.salon_name,
    services: res.included ? res.included.filter(item => item.type === 'master-service').map(service => ({
      duration: service.attributes.duration,
      price: service.attributes.price,
      serviceId: service.attributes.service_id,
    })) : [],
    username: res.data.attributes.full_name,
    vkProfile: res.data.attributes.vk_profile,
  }));

export default null;
