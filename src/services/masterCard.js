// @flow

import routes from '../routes';
import { post } from '../utils/provider';

export function getMasterById(id: number) {
  return post(routes.getMasterById, { id })
    .then(({ result: res }) => res && {
      id: res.id,
      username: res.username,
      phone: res.phone,
      city: res.master_city,
      isSalon: res.is_salon,
      salonName: res.salon_name,
      status: res.status,
      isVerified: res.verified,
      masterType: res.masterType,
      photo: res.master_photo,
      workPhoto: res.work_photo,
      hasCerfiticates: res.has_certificates,
      about: res.about,
      vk_profile: res.vk_profile,
      in_profile: res.in_profile,
      fb_profile: res.fb_profile,
      ok_profile: res.ok_profile,
      siteUrl: res.site_url,
      rating: res.rating,
      services: res.services.map(service => ({
        id: service.id,
        masterId: service.master_id,
        serviceId: service.service_id,
        price: service.price,
        duration: service.duration,
      })),
      addresses: res.addresses.map(address => ({
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
    } || {}
  );
}
