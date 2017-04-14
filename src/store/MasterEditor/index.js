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

import constants from '../../constants/master';

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

params.calendarSettingsOne.index = 0;
params.calendarSettingsTwo.index = 1;
params.calendarSettingsThree.index = 2;

params.uploadPhotoStatus = constants.UPLOAD_STATUS.INACTIVE;

type Service = {
  duration: number,
  price: number,
  service_id: string
};

type CustomService = {
  description: string,
  duration?: number,
  parent_service_id: string,
  price?: number
};

type CustomRecipientDate = {
  active: boolean,
  date: string,
  end_time: string,
  start_time: string
};

type Recipient = {
  custom_recipients: Array<CustomRecipientDate>,
  interval_id: number,
  start_date: string,
  time_end: string,
  time_start: string
};

type Address = {
  city: string,
  district: string,
  street: string,
  house: string,
  building: string,
  subway_station: string,
  salon_title: string,
  recipients: Array<Recipient>
};

type CreateMaster = {
  address: Array<Address>,
  certificates: Array<string>,
  custom_services: Array<CustomService>,
  first_name?: string,
  is_salon?: boolean,
  last_name?: string,
  master_photos: Array<string>,
  passport?: string,
  phone?: string,
  salon_name?: string,
  services: Array<Service>,
  work_photos: Array<string>
};

const createMasterQuery: CreateMaster = {
  address: [],
  certificates: [],
  custom_services: [],
  master_photos: [],
  services: [],
  work_photos: [],
};

export default {
  ...params,
  createMasterQuery,
};
