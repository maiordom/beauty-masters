// @flow

import routes from '../routes';
import { get } from '../utils/Provider';

export const getUserProfile = (headers: Object, params: Object) =>
  get(routes.getUserProfile, params, headers)
    .then((res) => (res.error ? res : {
      email: res.data.attributes.email,
      userId: res.data.id,
      masterCards: res.included ? res.included.map((card) => ({
        addresses: [],
        email: res.data.attributes.email,
        id: card.id,
        isMain: Boolean(card.attributes.is_main),
        isSalon: Boolean(card.attributes.is_salon),
        masterPhotos: [],
        masterServices: [],
        phone: card.attributes.phone,
        salonName: card.attributes.salon_name,
        username: card.attributes.full_name,
      })) : [],
    }));

export default null;
