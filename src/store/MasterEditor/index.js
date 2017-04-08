/*
 * @flow
 */

import each from 'lodash/each';

import CalendarSettings from './MasterEditorCalendarSettings';
import GeneralFields from './MasterEditorGeneral';
import HandlingTools from '../Filters/HandlingTools';
import Info from './MasterEditorInfo';
import ServiceManicure from '../Filters/ServiceManicure';
import ServicePedicure from '../Filters/ServicePedicure';

const params = {};

each({
  calendarSettingsOne: CalendarSettings,
  calendarSettingsThree: CalendarSettings,
  calendarSettingsTwo: CalendarSettings,
  generalSection: GeneralFields,
  handlingTools: HandlingTools,
  info: Info,
  serviceManicure: ServiceManicure,
  servicePedicure: ServicePedicure,
}, (fields, sectionName) => {
  params[sectionName] = {};

  each(fields, (fieldBuilder, fieldBuilderName) => {
    const fieldObject = fieldBuilder();

    fieldObject.sectionName = sectionName;
    fieldObject.modelName = fieldBuilderName;
    params[sectionName][fieldObject.modelName] = fieldObject;
  });
});

type Service = {
  duration: number,
  price: number,
  service_id: string,
};

type CustomService = {
  description: string,
  duration?: number,
  parent_service_id: string,
  price?: number,
};

type CreateMaster = {
  address: Array<any>,
  custom_services: Array<CustomService>,
  first_name?: string,
  is_salon?: boolean,
  last_name?: string,
  phone?: string,
  salon_name?: string,
  services: Array<Service>,
};

const createMasterQuery: CreateMaster = {
  address: [],
  custom_services: [],
  services: [],
};

export default {
  ...params,
  createMasterQuery,
};
