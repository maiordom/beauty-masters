// @flow
import each from 'lodash/each';
import moment from 'moment';

import type { SearchQueryType } from '../../types/CreateSearchQuery';

import ServiceManicure from '../Filters/ServiceManicure';
import ServicePedicure from '../Filters/ServicePedicure';
import General from './General';

const params = {};

each({
  serviceManicure: ServiceManicure,
  servicePedicure: ServicePedicure,
  general: General,
}, (fields, sectionName) => {
  params[sectionName] = {};

  each(fields, (fieldBuilder, fieldBuilderName) => {
    const fieldObject = fieldBuilder();

    fieldObject.sectionName = sectionName;
    fieldObject.modelName = fieldBuilderName;
    params[sectionName][fieldObject.modelName] = fieldObject;
  });
});

const searchQuery: SearchQueryType = {
  cityId: '175849',
  services: [],
  master_type: 1,
  radius: 400,
  schedule: [moment(new Date()).add(1, 'd').format('YYYY-MM-DD')],
  isDeparture: false,
};

export default {
  ...params,
  searchQuery,
};
