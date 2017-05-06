// @flow

import i18n from '../../i18n';

import type { CustomService } from '../../types/MasterEditor';

const customServiceQueryMapping = {
  title: 'description',
  duration: 'duration',
  price: 'price',
};

const manicureCustomServices = (customServices: Array<CustomService> = []) => ({
  items: customServices,
  queryParam: 'manicure_custom_services',
  queryMapping: customServiceQueryMapping,
});

const pedicureCustomServices = (customServices: Array<CustomService> = []) => ({
  items: customServices,
  queryParam: 'pedicure_custom_services',
  queryMapping: customServiceQueryMapping,
});

const homeAllowanceField = (homeAllowance: number) => ({
  placeholder: i18n.filters.homeAllowance,
  queryParam: 'home_allowance',
  value: homeAllowance || null,
});

export default {
  manicureCustomServices,
  pedicureCustomServices,
  homeAllowanceField,
};
