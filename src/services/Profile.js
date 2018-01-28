// @flow

import find from 'lodash/find';

import routes from '../routes';
import { get, post } from '../utils/Provider';

export const getUserProfile = (headers: Object, params: Object) =>
  get(routes.getUserProfile, params, headers)
    .then((res) => (res.error ? res : {
      email: res.data.attributes.email,
      userId: Number(res.data.id),
      masterCards: res.included ? res.included.map((card) => ({
        about: card.attributes.about,
        addresses: [],
        avatar: card.attributes.avatar,
        email: res.data.attributes.email,
        id: Number(card.id),
        isMain: Boolean(card.attributes.is_main),
        isSalon: Boolean(card.attributes.is_salon),
        masterPhotos: [],
        masterServices: [],
        phone: card.attributes.phone,
        salonName: card.attributes.salon_name,
        status: {
          masterServicesUploaded: false,
          addressesUploaded: false,
        },
        username: card.attributes.full_name,
      })) : [],
    }));

export const getMasterServices = (params: Object) =>
  get(routes.getMasterServices, params)
    .then((res: Object) => {
      if (res.error) {
        return res;
      }

      return res.data.map(item => ({
        categoryId: item.attributes.category_service_id,
        duration: item.attributes.duration,
        price: item.attributes.price,
        serviceId: item.attributes.service_id,
        title: item.attributes.title,
      }));
    });

export const getAddresses = (params: Object) =>
  get(routes.getAddress, params)
    .then((res: Object) => {
      if (res.error) {
        return res;
      }

      return res.data.filter((item: Object) => item.type === 'address').map((item: Object) => {
        const address = {
          address: item.attributes.address,
          city: item.attributes.city,
          id: item.id,
          location: {
            lat: item.attributes.lat,
            lng: item.attributes.lon,
          },
          name: item.attributes.name,
          schedules: [],
          subwayStation: item.attributes.subway_station,
          timeTable: {},
        };

        const timeTable = item.relationships.timetables.data[0];

        if (timeTable) {
          const timeTableObject = find(res.included, { type: 'timetable', id: timeTable.id });

          if (timeTableObject) {
            address.timeTable = {
              dateStart: timeTableObject.attributes.date_start,
              id: timeTable.id,
              intervalType: timeTableObject.attributes.interval_type,
              timeEnd: timeTableObject.attributes.time_end,
              timeStart: timeTableObject.attributes.time_start,
            };
          }
        }

        item.relationships.schedules.data.forEach((item: Object) => {
          const scheduleObject = find(res.included, { type: 'schedule', id: item.id });

          if (scheduleObject) {
            address.schedules.push({
              date: scheduleObject.attributes.date,
              timeStart: scheduleObject.attributes.time_start,
              timeEnd: scheduleObject.attributes.time_end,
              isNotWork: scheduleObject.attributes.is_not_work,
            });
          }
        });

        return address;
      });
    });

export const sendResetPasswordLink = (params: Object) => post(routes.sendResetPasswordLink, params);

export default null;
