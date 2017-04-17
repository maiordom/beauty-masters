/* @flow */

type Service = {
  duration?: number,
  price?: number,
  service_id: string,
};

type CustomService = {
  description: string,
  duration?: number,
  parent_service_id: string,
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
  interval_id: string,
  salon_title: string,
  start_date: string,
  street: string,
  subway_station: string,
  time_end: string,
  time_start: string,
};

export type CreateMasterQuery = {
  certificates: Array<string>,
  custom_services: Array<CustomService>,
  first_name?: string,
  is_salon?: boolean,
  last_name?: string,
  master_addresses: Array<MasterAddress>,
  master_photos: Array<string>,
  passport?: string,
  phone?: string,
  salon_name?: string,
  services: Array<Service>,
  work_photos: Array<string>
};
