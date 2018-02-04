// @flow

import each from 'lodash/each';
import moment from 'moment';

import CalendarSettings from './MasterEditorCalendarSettings';
import GeneralFields from './MasterEditorGeneral';
import HandlingTools from '../Service/HandlingTools';
import Info from './MasterEditorInfo';
import ServiceManicure from '../Service/ServiceManicure';
import ServicePedicure from '../Service/ServicePedicure';
import Services from './MasterEditorServices';

import constants from '../../constants/Master';

import type { TCreateMaster } from '../../types/CreateMaster';
import type { TCustomService, TMasterService } from '../../types/CreateService';

const citiesModel = () => ({
  selected: {
    id: 1,
    name: 'Москва',
    lat: 55.753994,
    lon: 37.622093,
    hasSubway: true,
  },
  items: [],
  filtered: null,
});

const params = {
  cardType: 'create',
  editStatus: {
    general: 'required',
    services: 'required',
    addresses: 'required',
    photos: 'required',
  },
  masterCardId: null,
};

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

[
  params.calendarSettingsOne,
  params.calendarSettingsTwo,
  params.calendarSettingsThree,
].forEach((object, index) => {
  const cities = citiesModel();

  object.index = index;
  object.schedulesCreated = false;
  object.timeTableId = null;
  object.addressId = null;
  object.cityField.value = cities.selected.name;
  object.startDateField.value = moment().format('YYYY-MM-DD');
  object.cities = cities;

  object.createAddressQuery.city = cities.selected.name;
  object.createAddressQuery.lat = cities.selected.lat;
  object.createAddressQuery.lon = cities.selected.lon;

  object.createTimeTableQuery.time_start = object.timeStartField.value;
  object.createTimeTableQuery.time_end = object.timeEndField.value;
  object.createTimeTableQuery.interval_type = object.intervalGroup.selected.id;
  object.createTimeTableQuery.date_start = moment().format('YYYY-MM-DD');

  [
    object.createAddressQuery,
    object.createTimeTableQuery,
    object.createSchedulesQuery,
  ].forEach((query) => {
    delete query.sectionName;
    delete query.modelName;
  });
});

params.uploadPhotoStatus = constants.UPLOAD_STATUS.INACTIVE;

const createMasterQuery: TCreateMaster = {};
const manicureCustomServicesQuery: Array<TCustomService> = [];
const masterServicesQuery: Array<TMasterService> = [];
const pedicureCustomServicesQuery: Array<TCustomService> = [];

const masterEditorObject = {
  ...params,
  createMasterQuery,
  manicureCustomServicesQuery,
  masterServicesQuery,
  pedicureCustomServicesQuery,
};

const masterEditorJSONString = JSON.stringify(masterEditorObject);

export default JSON.parse(masterEditorJSONString);

export const getCleanMasterEditorObject = () => {
  const cleanObject = JSON.parse(masterEditorJSONString);

  [
    'calendarSettingsOne',
    'calendarSettingsThree',
    'calendarSettingsTwo',
  ].forEach((modelName) => {
    cleanObject[modelName].startDateField.value = moment().format('YYYY-MM-DD');
    cleanObject[modelName].createTimeTableQuery.date_start = moment().format('YYYY-MM-DD');
  });

  return cleanObject;
};
