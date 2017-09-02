// @flow

import routes from '../routes';
import { get } from '../utils/provider';

export const getUserProfile = (headers) =>
  get(routes.getUserProfile, {}, headers)
    .then((res) => ({
      userId: res.data.id,
      masterCards: res.included.map((card) => ({
        id: card.id,
        isMain: card.attributes.is_main,
        isSalon: card.attributes.is_salon,
        phone: card.attributes.phone,
        salonName: card.attributes.salon_name,
        username: card.attributes.full_name,
      })),
    }));

export default null;
