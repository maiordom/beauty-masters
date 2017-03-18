import each from 'lodash/each';

import GeneralFields from './MasterEditorGeneral';
import ServiceManicure from './MasterEditorServiceManicure';
import ServicePedicure from './MasterEditorServicePedicure';

const params = {};

each({
  generalSection: GeneralFields,
  serviceManicure: ServiceManicure,
  servicePedicure: ServicePedicure,
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
