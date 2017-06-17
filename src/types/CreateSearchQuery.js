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
  isDeparture: boolean,
  master_type: number,
  radius: number,
  schedule: Array<string>,
  services: Array<Service>,
};
