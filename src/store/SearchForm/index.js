// @flow
import each from 'lodash/each';
import moment from 'moment';

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

type SearchQueryType = {
  cityId: string,
  services: Array<any>,
  master_type: number,
  coordinates?: {
    longitude: string,
    latitude: string
  },
  radius: number,
  schedule: Array<string>,
  isDeparture: boolean
};

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
