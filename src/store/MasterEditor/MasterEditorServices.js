// @flow

import i18n from '../../i18n';

const manicureParentServiceId = 1;
const pedicureParentServiceId = 33;

const customServiceQueryMapping = {
  title: 'description',
  duration: 'duration',
  parentServiceId: 'parent_service_id',
  price: 'price',
};

const manicureCustomServices = (customServices: Array<any> = []) => ({
  items: customServices,
  parentServiceId: manicureParentServiceId,
  queryParam: 'manicure_custom_services',
  queryMapping: customServiceQueryMapping,
});

const pedicureCustomServices = (customServices: Array<any> = []) => ({
  items: customServices,
  parentServiceId: pedicureParentServiceId,
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
