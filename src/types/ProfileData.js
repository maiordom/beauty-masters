/* @flow */

export type Service = {
  id: number,
  masterId: number,
  serviceId: number,
  price: number,
  duration: string,
}

export type ProfileData = {
  id: number,
  userId: number,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  masterCity: string,
  masterPhoto: ?Array<string>,
  services: Array<Service>
}
