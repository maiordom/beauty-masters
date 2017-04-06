// @flow
import each from 'lodash/each';

import ServiceManicure from '../Filters/ServiceManicure';
import ServicePedicure from '../Filters/ServicePedicure';
import General from './General';

const params = {};

each({
    serviceManicure: ServiceManicure,
    servicePedicure: ServicePedicure,
    general: General
}, (fields, sectionName) => {
    params[sectionName] = {};

    each(fields, fieldBuilder => {
        const fieldObject = fieldBuilder();

        fieldObject.sectionName = sectionName;
        fieldObject.modelName = fieldBuilder.name;
        params[sectionName][fieldObject.modelName] = fieldObject;
    });
});

type SearchQueryType = {
  services: Array<any>,
  coordinates?: {
    longitude: string,
    latitude: string
  },
  radius?: number,
  schedule?: Array<string>,
  cityId: string,
  master_type: Array<number>
};

const searchQuery: SearchQueryType = {
  cityId: '175849',
  services: [],
  master_type: [1]
};

export default {
  ...params,
  searchQuery,
};
