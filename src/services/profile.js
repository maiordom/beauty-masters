// @flow

import routes from '../routes';
import { get } from '../utils/provider';

export const getUserProfile = (headers: Object) =>
  get(routes.getUserProfile, {}, headers)
    .then((res) => ({
      email: res.data.attributes.email,
      userId: res.data.id,
      masterCards: res.included.map((card) => ({
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
      })),
    }));

export default null;
