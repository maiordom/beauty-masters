/* @flow */

type Service = {
  active: boolean,
  dictionaryKey: string,
  duration?: string,
  id: number,
  parentServiceId: number,
  price?: number,
  title: string,
};

export type SearchQueryType = {
  cityId: string,
  services: Array<Service>,
  master_type: number,
  coordinates?: {
    longitude: string,
    latitude: string
  },
  radius: number,
  schedule: Array<string>,
  isDeparture: boolean
};
