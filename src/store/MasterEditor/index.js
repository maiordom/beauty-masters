// @flow

import each from 'lodash/each';

import CalendarSettings from './MasterEditorCalendarSettings';
import GeneralFields from './MasterEditorGeneral';
import HandlingTools from '../Service/HandlingTools';
import Info from './MasterEditorInfo';
import ServiceManicure from '../Service/ServiceManicure';
import ServicePedicure from '../Service/ServicePedicure';
import Services from './MasterEditorServices';

import Geo from '../Geo';
import constants from '../../constants/master';

import type { TCreateMaster } from '../../types/CreateMaster';
import type { TCustomService, TMasterService } from '../../types/CreateService';

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

[
  params.calendarSettingsOne,
  params.calendarSettingsTwo,
  params.calendarSettingsThree,
].forEach((object, index) => {
  object.index = index;
  object.cityField.value = Geo.city.name;
  object.createAddressQuery.city = Geo.city.name;
  object.createAddressQuery.lat = Geo.city.location.lat;
  object.createAddressQuery.lon = Geo.city.location.lng;

  delete object.createAddressQuery.sectionName;
  delete object.createAddressQuery.modelName;
});

params.uploadPhotoStatus = constants.UPLOAD_STATUS.INACTIVE;

const createMasterQuery: TCreateMaster = {};
const manicureCustomServicesQuery: Array<TCustomService> = [];
const masterServicesQuery: Array<TMasterService> = [];
const pedicureCustomServicesQuery: Array<TCustomService> = [];

export default {
  ...params,
  createMasterQuery,
  manicureCustomServicesQuery,
  masterCardId: 3,
  masterServicesQuery,
  pedicureCustomServicesQuery,
};
