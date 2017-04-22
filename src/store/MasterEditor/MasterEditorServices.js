// @flow

import i18n from '../../i18n';

const customServices = (customServices: Array<any> = []) => ({
  items: customServices,
  queryParam: 'custom_services',
  queryMapping: {
    description: 'description',
    duration: 'duration',
    parentServiceId: 'parent_service_id',
    price: 'price',
  },
});

const homeAllowanceField = (homeAllowance: number) => ({
  placeholder: i18n.filters.homeAllowance,
  queryParam: 'home_allowance',
  value: homeAllowance || null,
});

export default {
  customServices,
  homeAllowanceField,
};
