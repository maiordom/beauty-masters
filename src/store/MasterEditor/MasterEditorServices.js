// @flow

import i18n from '../../i18n';

import type { TCustomService } from '../../types/CreateService';

const manicureCustomServices = (customServices: Array<TCustomService> = []) => ({
  dictionaryKey: 'ManicureOther',
  items: customServices,
  queryParam: 'manicureCustomServicesQuery',
});

const pedicureCustomServices = (customServices: Array<TCustomService> = []) => ({
  dictionaryKey: 'PedicureOther',
  items: customServices,
  queryParam: 'pedicureCustomServicesQuery',
});

const homeDepartureField = (homeDeparture: number) => ({
  dictionaryKey: 'AtHome',
  placeholder: i18n.filters.homeDeparture,
  queryParam: 'home_allowance',
  value: homeDeparture || null,
});

export default {
  manicureCustomServices,
  pedicureCustomServices,
  homeDepartureField,
};
