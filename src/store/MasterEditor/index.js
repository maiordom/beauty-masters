/*
 * @flow
 */

import each from 'lodash/each';

import CalendarSettings from './MasterEditorCalendarSettings';
import GeneralFields from './MasterEditorGeneral';
import HandlingTools from '../Service/HandlingTools';
import Info from './MasterEditorInfo';
import ServiceManicure from '../Service/ServiceManicure';
import ServicePedicure from '../Service/ServicePedicure';
import Services from './MasterEditorServices';

import constants from '../../constants/master';

import type { CreateMasterQuery } from '../../types/CreateMasterQuery';

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
  services: Services,
}, (fields, sectionName) => {
  params[sectionName] = {};

  each(fields, (fieldBuilder, fieldBuilderName) => {
    const fieldObject = fieldBuilder();

    fieldObject.sectionName = sectionName;
    fieldObject.modelName = fieldBuilderName;
    params[sectionName][fieldObject.modelName] = fieldObject;
  });
});

Object.assign(params.serviceManicure.classicManicure, { required: true, active: true });
Object.assign(params.serviceManicure.removingNailPolishManicure, { required: true, active: true });
Object.assign(params.serviceManicure.applyingNailPolishManicure, { required: true, active: true });

params.calendarSettingsOne.index = 0;
params.calendarSettingsTwo.index = 1;
params.calendarSettingsThree.index = 2;

params.uploadPhotoStatus = constants.UPLOAD_STATUS.INACTIVE;

const createMasterQuery: CreateMasterQuery = {
  master_addresses: [],
  certificates: [],
  manicure_custom_services: [],
  pedicure_custom_services: [],
  master_photos: [],
  services: [
    { service_id: params.serviceManicure.classicManicure.id },
    { service_id: params.serviceManicure.removingNailPolishManicure.id },
    { service_id: params.serviceManicure.applyingNailPolishManicure.id }
  ],
  work_photos: [],
};

export default {
  ...params,
  createMasterQuery,
};
