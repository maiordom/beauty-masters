// @flow
import each from 'lodash/each';

import type { TSearchQuery } from '../../types/CreateSearchQuery';
import type { TSearchFormCategorySection } from '../../types/SearchFormCategories';

import ServiceManicure from '../Service/ServiceManicure';
import ServicePedicure from '../Service/ServicePedicure';
import General from './General';

import i18n from '../../i18n';

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

const { serviceManicure, servicePedicure } = params;
const manicureSearchFormSections: Array<TSearchFormCategorySection> = [
  {
    title: i18n.filters.nailProcessingMethod,
    services: [
      serviceManicure.classicManicure,
      serviceManicure.hardwareManicure,
      serviceManicure.europeanManicure,
    ],
  },
  {
    title: i18n.filters.coverage,
    services: [
      serviceManicure.applyingShellacManicure,
      serviceManicure.applyingBioGelManicure,
      serviceManicure.applyingNailPolishManicure,
    ],
  },
  {
    title: i18n.filters.withdrawal,
    services: [
      serviceManicure.removingNailPolishManicure,
      serviceManicure.removingBioGelManicure,
      serviceManicure.removingShellacManicure,
      serviceManicure.removingGelManicure,
      serviceManicure.removingNailsManicure,
    ],
  },
  {
    title: i18n.filters.otherServices,
    services: [
      serviceManicure.designManicure,
      serviceManicure.extensionManicure,
    ],
  },
];
const pedicureSearchFormSections: Array<TSearchFormCategorySection> = [
  {
    title: i18n.filters.nailProcessingMethod,
    services: [
      servicePedicure.classicPedicure,
      servicePedicure.hardwarePedicure,
      servicePedicure.europeanPedicure,
    ],
  },
  {
    title: i18n.filters.coverage,
    services: [
      servicePedicure.applyingShellacPedicure,
      servicePedicure.applyingBioGelPedicure,
      servicePedicure.applyingNailPolishPedicure,
    ],
  },
  {
    title: i18n.filters.withdrawal,
    services: [
      servicePedicure.removingNailPolishPedicure,
      servicePedicure.removingBioGelPedicure,
      servicePedicure.removingShellacPedicure,
      servicePedicure.removingGelPedicure,
      servicePedicure.removingNailsPedicure,
    ],
  },
  {
    title: i18n.filters.otherServices,
    services: [
      servicePedicure.designPedicure,
      servicePedicure.extensionPedicure,
    ],
  },
];
params.manicureSearchFormSections = manicureSearchFormSections;
params.pedicureSearchFormSections = pedicureSearchFormSections;

const searchQuery: TSearchQuery = {
  category_service_ids: [],
  dates: [],
  lat: 55.76,
  lon: 37.64,
  radius: 2000,
  service_ids: [],
};

const searchResult = { items: [] };
const searchListResult = { items: [] };

export default {
  ...params,
  searchQuery,
  searchResult,
  searchListResult,
};
