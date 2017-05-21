/* @flow */

type Service = {
  id: number,
  master_id: number,
  service_id: number,
  price: number,
  duration: ?string,
};

type Schedule = {
  id: number,
  masterId: number,
  masterAddressId: number,
  date: string,
  timeStart: string,
  timeEnd: string,
};

type Address = {
  id: number,
  masterId: number,
  city: string,
  district: string,
  street: string,
  house: string,
  building: string,
  subwayStation: string,
  salonTitle: string,
  dopInfo: string,
  masterSchedules: Array<Schedule>
};

export type MasterCardType = {
  id: number,
  userId: number,
  firstName: string,
  lastName: string,
  phone: string,
  MasterType: number,
  masterCity: ?string,
  isSalon: boolean,
  salonName: string,
  status: number,
  masterPhoto: ?Array<string>,
  workPhoto: ?Array<string>,
  hasCertificates: boolean,
  certificates: ?Array<string>,
  about: ?string,
  vkProfile: ?string,
  inProfile: ?string,
  fbProfile: ?string,
  okProfile: ?string,
  site_url: ?string,
  rating: ?string,
  services: Array<Service>,
  addresses: Array<Address>
};

export type MapCardType = {
  photo: string,
  isVerified: boolean,
  title: string,
  subtitle: string,
  address: string,
  distance: string,
  closestDate?: string,
  services?: Array<Service>,
}
