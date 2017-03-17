import each from 'lodash/each';

import GeneralFields from './MasterEditorGeneral';

const params = {};

each({
  generalSection: GeneralFields,
}, (fields, sectionName) => {
  params[sectionName] = {};

  each(fields, fieldBuilder => {
    const fieldObject = fieldBuilder();

    fieldObject.sectionName = sectionName;
    params[sectionName][fieldObject.modelName] = fieldObject;
  });
});

export default {
  ...params
};
