/* @flow */

export type TCustomService = {
  attributes: {
    category_service_id: number,
    duration: string,
    price: number,
    title: string,
  }
};

export type TCreateMaster = {
  about?: string,
  full_name?: string,
  in_profile?: string,
  is_salon?: boolean,
  phone?: string,
  salon_name?: string,
  user_id?: number,
  vk_profile?: string,
};

export type TMasterService = {
  attributes: {
    category_service_id: number,
    description: string,
    duration: number,
    price: string,
    service_id: number,
    title: string,
  }
};
