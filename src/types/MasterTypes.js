/* @flow */

type Service = {
  id: number,
  master_id: number,
  service_id: number,
  price: number,
  duration: ?string,
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
};

export type MapCardType = {
  title: string,
  photo: string,
  type: string,
  metroStation: string,
  distance: string,
  closestDate: string,
  services: Array<Service>,
}
