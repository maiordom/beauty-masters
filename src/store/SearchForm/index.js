import each from 'lodash/each';

import ServiceManicure from '../Filters/ServiceManicure';
import ServicePedicure from '../Filters/ServicePedicure';
import HandlingTools from '../Filters/HandlingTools';

const params = {};

each({
    serviceManicure: ServiceManicure,
    servicePedicure: ServicePedicure,
    handlingTools: HandlingTools,
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
