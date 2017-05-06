// @flow

export type CustomService = {
  description: string,
  duration: string,
  price: number,
};

export type ServicePedicure = {
  active: boolean,
  dictionaryKey: string,
  duration?: string,
  id: number,
  parentServiceId: number,
  price?: number,
  title: string,
};

export type ServiceManicure = {
  active: boolean,
  dictionaryKey: string,
  duration?: string,
  id: number,
  parentServiceId: number,
  price?: number,
  title: string,
};

export type HandlingTools = {
  description?: string,
  dictionaryKey: string,
  id: number,
  parentServiceId: number,
  placeholder?: string,
  title: string,
  value: boolean,
};
