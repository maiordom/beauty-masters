// @flow

export type TServicePedicure = {
  active: boolean,
  categoryKey?: string,
  dictionaryKey: string,
  isCategory?: boolean,
  title: string,
};

export type TServiceManicure = {
  active: boolean,
  categoryKey?: string,
  dictionaryKey: string,
  duration?: number,
  isCategory?: boolean,
  price?: string,
  required?: boolean,
  title: string,
};

export type THandlingTools = {
  dictionaryKey: string,
  placeholder?: string,
  title: string,
  value: boolean,
};
