/* @flow */

type Service = {
  duration?: string,
  price?: number,
  service_id: number,
};

type CustomService = {
  description: string,
  duration?: string,
  parent_service_id: number,
  price?: number,
};

type CustomRecipientDate = {
  active: boolean,
  date: string,
  end_time: string,
  start_time: string,
};

type MasterAddress = {
  building: string,
  city: string,
  custom_recipients: Array<CustomRecipientDate>,
  district: string,
  house: string,
  interval_id: number,
  salon_title: string,
  start_date: string,
  street: string,
  subway_station: string,
  time_end: string,
  time_start: string,
};

export type CreateMasterQuery = {
  certificates: Array<string>,
  username?: string,
  is_salon?: boolean,
  last_name?: string,
  manicure_custom_services: Array<CustomService>,
  master_addresses: Array<MasterAddress>,
  master_photos: Array<string>,
  pedicure_custom_services: Array<CustomService>,
  phone?: string,
  salon_name?: string,
  services: Array<Service>,
  work_photos: Array<string>
};
