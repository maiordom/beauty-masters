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

type Recipient = {
  custom_recipients: Array<CustomRecipientDate>,
  interval_id: string,
  start_date: string,
  time_end: string,
  time_start: string,
};

type Address = {
  city: string,
  district: string,
  street: string,
  house: string,
  building: string,
  subway_station: string,
  salon_title: string,
  recipients: Recipient,
};

export type CreateMasterQuery = {
  address: Array<Address>,
  certificates: Array<string>,
  custom_services: Array<CustomService>,
  first_name?: string,
  is_salon?: boolean,
  last_name?: string,
  master_photos: Array<string>,
  passport?: string,
  phone?: string,
  salon_name?: string,
  services: Array<Service>,
  work_photos: Array<string>
};
