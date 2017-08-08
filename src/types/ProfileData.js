/* @flow */

export type Service = {
  id: number,
  masterId: number,
  serviceId: number,
  price: number,
  duration: string,
}

export type ProfileData = {
  email: string,
  id: number,
  masterCity: string,
  masterPhoto: ?Array<string>,
  phone: string,
  services: Array<Service>,
  username: string,
}
