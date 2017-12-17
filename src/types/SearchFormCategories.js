
// @flow
import type { TServiceManicure, TServicePedicure } from './MasterEditor';

export type TSearchFormCategorySection = {
  title: string,
  services: Array<TServiceManicure | TServicePedicure>,
};
