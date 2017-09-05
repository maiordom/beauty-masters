// @flow

import i18n from '../../i18n';

import type { TCustomService } from '../../types/CreateService';

const manicureCustomServices = (customServices: Array<TCustomService> = []) => ({
  dictionaryKey: 'Manicure',
  items: customServices,
  queryParam: 'manicureCustomServicesQuery',
});

const pedicureCustomServices = (customServices: Array<TCustomService> = []) => ({
  dictionaryKey: 'Pedicure',
  items: customServices,
  queryParam: 'pedicureCustomServicesQuery',
});

const homeAllowanceField = (homeAllowance: number) => ({
  dictionaryKey: 'AtHome',
  placeholder: i18n.filters.homeAllowance,
  queryParam: 'home_allowance',
  value: homeAllowance || null,
});

export default {
  manicureCustomServices,
  pedicureCustomServices,
  homeAllowanceField,
};
