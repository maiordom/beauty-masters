// @flow

export type CustomService = {
  description: string,
  duration: string,
  price: number,
};

export type ServicePedicure = {
  active: boolean,
  dictionaryKey: string,
  title: string,
};

export type ServiceManicure = {
  active: boolean,
  dictionaryKey: string,
  required?: boolean,
  title: string,
};

export type HandlingTools = {
  dictionaryKey: string,
  placeholder?: string,
  title: string,
  value: boolean,
};
