// @flow
import each from 'lodash/each';
import moment from 'moment';

import type { TSearchQuery } from '../../types/CreateSearchQuery';

import ServiceManicure from '../Service/ServiceManicure';
import ServicePedicure from '../Service/ServicePedicure';
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

const searchQuery: TSearchQuery = {
  category_service_ids: [],
  city: 'RU-MOW',
  dates: [moment(new Date()).add(1, 'd').format('YYYY-MM-DD')],
  is_salon: 0,
  lat: 55.76,
  lon: 37.64,
  radius: 2000,
  service_ids: [],
};

const searchResult = { items: [] };

export default {
  ...params,
  searchQuery,
  searchResult,
};
