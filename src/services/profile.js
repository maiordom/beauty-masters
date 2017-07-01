// @flow

import routes from '../routes';
import { post } from '../utils/provider';

import profileData from '../test/ProfileData';

import type { ProfileData } from '../types/ProfileData';

export function getUserProfile() {
  return post(routes.getUserProfile, {})
    .then(() => { // here we will fetch real data
      const response = profileData;

      const profile : ProfileData = {
        id: response.id,
        firstName: response.first_name,
        lastName: response.last_name,
        phone: response.phone,
        email: response.email,
        masterCity: response.master_city,
        salonName: response.salon_name,
        masterPhoto: response.master_photo,
        services: response.services.map(service => ({
          id: service.id,
          masterId: service.master_id,
          serviceId: service.service_id,
          price: service.price,
          duration: service.duration,
        })),
        addresses: response.addresses.map(address => ({
          id: address.id,
          masterId: address.master_id,
          city: address.city,
          district: address.district,
          street: address.street,
          house: address.house,
          building: address.building,
          subwayStation: address.subway_station,
          salonTitle: address.salon_title,
          dopInfo: address.dopInfo,
          theGeom: address.the_geom,
          coordinates: address.Coordinates,
          masterSchedules: address.master_schedules.map(schedule => ({
            id: schedule.id,
            masterId: schedule.master_id,
            masterAddressId: schedule.master_address_id,
            date: schedule.date,
            timeStart: schedule.time_start,
            timeEnd: schedule.time_end,
          })),
        })),
      };

      return profile;
    });
}
