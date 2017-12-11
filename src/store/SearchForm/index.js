// @flow
import each from 'lodash/each';
import moment from 'moment';

import type { TSearchQuery } from '../../types/CreateSearchQuery';

import ServiceManicure from '../Service/ServiceManicure';
import ServicePedicure from '../Service/ServicePedicure';
import General from './General';

const params = {};

each({
  serviceManicure: {
    classicManicure: ServiceManicure.classicManicure,
    hardwareManicure: ServiceManicure.hardwareManicure,
    europeanManicure: ServiceManicure.europeanManicure,
    applyingShellacManicure: ServiceManicure.applyingShellacManicure,
    applyingBioGelManicure: ServiceManicure.applyingBioGelManicure,
    applyingNailPolishManicure: ServiceManicure.applyingNailPolishManicure,
    removingNailPolishManicure: ServiceManicure.removingNailPolishManicure,
    removingBioGelManicure: ServiceManicure.removingBioGelManicure,
    removingShellacManicure: ServiceManicure.removingShellacManicure,
    removingGelManicure: ServiceManicure.removingGelManicure,
    removingNailsManicure: ServiceManicure.removingNailsManicure,
    designManicure: ServiceManicure.designManicure,
    extensionManicure: ServiceManicure.extensionManicure,
  },
  servicePedicure: {
    classicPedicure: ServicePedicure.classicPedicure,
    hardwarePedicure: ServicePedicure.hardwarePedicure,
    europeanPedicure: ServicePedicure.europeanPedicure,
    applyingShellacPedicure: ServicePedicure.applyingShellacPedicure,
    applyingBioGelPedicure: ServicePedicure.applyingBioGelPedicure,
    applyingNailPolishPedicure: ServicePedicure.applyingNailPolishPedicure,
    removingNailPolishPedicure: ServicePedicure.removingNailPolishPedicure,
    removingBioGelPedicure: ServicePedicure.removingBioGelPedicure,
    removingShellacPedicure: ServicePedicure.removingShellacPedicure,
    removingGelPedicure: ServicePedicure.removingGelPedicure,
    removingNailsPedicure: ServicePedicure.removingNailsPedicure,
    designPedicure: ServicePedicure.designPedicure,
    extensionPedicure: ServicePedicure.extensionPedicure,
  },
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
