// @flow

import i18n from '../../i18n';

const customServiceQueryMapping = {
  title: 'description',
  duration: 'duration',
  price: 'price',
};

const manicureCustomServices = (customServices: Array<any> = []) => ({
  items: customServices,
  queryParam: 'manicure_custom_services',
  queryMapping: customServiceQueryMapping,
});

const pedicureCustomServices = (customServices: Array<any> = []) => ({
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
