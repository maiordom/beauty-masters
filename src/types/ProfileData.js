/* @flow */

type Service = {
  id: number,
  master_id: number,
  service_id: number,
  price: number,
  duration: string,
}

export type ProfileData = {
  id: number,
  user_id: number,
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  MasterType: number,
  master_city: string,
  is_salon: boolean,
  salon_name: string,
  status: number,
  master_photo: ?string,
  work_photo: ?string,
  has_certificates: boolean,
  certificates: ?Array<any>,
  about: string,
  vk_profile: string,
  in_profile: string,
  fb_profile: string,
  ok_profile: string,
  site_url: string,
  rating: string,
  services: Array<Service>
}
