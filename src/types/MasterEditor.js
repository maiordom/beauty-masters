// @flow

export type CustomService = {
  description: string,
  duration: string,
  price: number,
};

export type ServicePedicure = {
  active: boolean,
  categoryKey?: string,
  dictionaryKey: string,
  title: string,
};

export type TServiceManicure = {
  active: boolean,
  categoryKey?: string,
  dictionaryKey: string,
  duration?: number,
  price?: string,
  required?: boolean,
  title: string,
};

export type HandlingTools = {
  dictionaryKey: string,
  placeholder?: string,
  title: string,
  value: boolean,
};
