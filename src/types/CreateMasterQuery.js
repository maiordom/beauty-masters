/* @flow */

export type Service = {
  duration?: string,
  price: number,
  service_id: number,
};

export type MasterAddress = {
  building: string,
  city: string,
  district: string,
  house: string,
  master_card_id: number,
  name: string,
  street: string,
  subway_station: string,
};

export type CreateMasterQuery = {
  about: string,
  full_name: string,
  in_profile: string,
  is_salon: boolean,
  phone: string,
  salon_name: string,
  user_id: number,
  vk_profile: string,
};
