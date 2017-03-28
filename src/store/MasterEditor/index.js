import each from 'lodash/each';

import GeneralFields from './MasterEditorGeneral';
import ServiceManicure from '../Filters/ServiceManicure';
import ServicePedicure from '../Filters/ServicePedicure';
import HandlingTools from '../Filters/HandlingTools';
import CalendarSettings from './MasterEditorCalendarSettings';

const params = {};

each({
  generalSection: GeneralFields,
  serviceManicure: ServiceManicure,
  servicePedicure: ServicePedicure,
  handlingTools: HandlingTools,
  calendarSettingsOne: CalendarSettings,
  calendarSettingsTwo: CalendarSettings,
  calendarSettingsThree: CalendarSettings,
}, (fields, sectionName) => {
  params[sectionName] = {};

  each(fields, fieldBuilder => {
    const fieldObject = fieldBuilder();

    fieldObject.sectionName = sectionName;
    fieldObject.modelName = fieldBuilder.name;
    params[sectionName][fieldObject.modelName] = fieldObject;
  });
});

export default {
  ...params
};
