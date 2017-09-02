// @flow

export type TCustomService = {
  attributes: {
    category_service_id: number,
    duration: string,
    price: number,
    title: string,
  }
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
