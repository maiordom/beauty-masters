/* @flow */

type Service = {
  duration: string,
  id: number,
  price: number,
  title: string,
};

type Schedule = {
  date: string,
  id: number,
  masterAddressId: number,
  masterId: number,
  timeEnd: string,
  timeStart: string,
};

type Address = {
  building: string,
  city: string,
  district: string,
  dopInfo: string,
  house: string,
  id: number,
  masterId: number,
  masterSchedules: Array<Schedule>,
  salonTitle: string,
  street: string,
  subwayStation: string,
};

export type MasterCardType = {
  about: ?string,
  addresses: Array<Address>,
  certificates: ?Array<string>,
  fbProfile?: string,
  hasCertificates: boolean,
  id: number,
  inProfile?: string,
  isFavorite?: boolean,
  isSalon: boolean,
  masterCity: ?string,
  masterPhoto: ?Array<string>,
  MasterType: number,
  okProfile?: string,
  phone: string,
  rating: ?string,
  renderLoader: boolean,
  salonName: string,
  services: Array<Service>,
  site_url: ?string,
  status: number,
  userId: number,
  username: string,
  vkProfile?: string,
  workPhoto: ?Array<string>,
};

export type MapCardType = {
  address: string,
  closestDate?: string | null,
  coordinates: {
    latitude: number,
    longitude: number,
  },
  distance: string,
  id: number,
  isVerified: boolean,
  location?: 'map' | 'list',
  masterType: number,
  onPress: () => void,
  photo: string,
  services: Array<Service>,
  username: string,
}
