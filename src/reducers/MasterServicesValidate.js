import each from 'lodash/each';

export const validateGeneralServices = (state) => {
  const { serviceManicure, servicePedicure } = state.masterEditor;

  [serviceManicure, servicePedicure].forEach(service => {
    let activeServicesCount = 0;

    service.hasValidationErrors = false;

    each(service, model => {
      if (model.active) {
        activeServicesCount++;
        if (!model.price) {
          model.errorFillPrice = true;
          service.hasValidationErrors = true;
        } else {
          model.errorFillPrice = false;
        }
      }
    });

    service.activeServicesCount = activeServicesCount;
  });

  state.masterEditor = { ...state.masterEditor };
  state.masterEditor.serviceManicure = { ...serviceManicure };
  state.masterEditor.servicePedicure = { ...servicePedicure };

  return state;
};

export const validateCustomServices = (state) => {
  const { manicureCustomServices, pedicureCustomServices } = state.masterEditor.services;

  [manicureCustomServices, pedicureCustomServices].forEach(service => {
    service.hasValidationErrors = false;

    each(service.items, model => {
      if (model.active) {
        if (!model.price) {
          model.errorFillPrice = true;
          service.hasValidationErrors = true;
        } else {
          model.errorFillPrice = false;
        }

        if (!model.title) {
          model.errorFillTitle = true;
          service.hasValidationErrors;
        } else {
          model.errorFillTitle = false;
        }
      }
    });
  });

  manicureCustomServices.items = [...manicureCustomServices.items];
  state.masterEditor.services.manicureCustomServices = { ...manicureCustomServices };

  pedicureCustomServices.items = [...pedicureCustomServices.items];
  state.masterEditor.services.pedicureCustomServices = { ...pedicureCustomServices };

  return state;
};
