import find from 'lodash/find';

import { makeReducer } from '../utils';

import actions from '../constants/MasterEdit';

export default makeReducer((state, action) => ({
  [actions.MASTER_EDIT_GENERAL_INFO_SET]: (state, { payload: { masterCard } }) => {
    const section = state.masterEditor.generalSection;

    section.usernameField.value = masterCard.username;
    section.phoneField.value = masterCard.phone;
    section.isSalonField.value = masterCard.isSalon;
    section.salonNameField.value = masterCard.salonName;

    Object.assign(state.masterEditor.createMasterQuery, {
      [section.usernameField.queryParam]: masterCard.username,
      [section.phoneField.queryParam]: masterCard.phone,
      [section.isSalonField.queryParam]: masterCard.isSalon,
      [section.salonNameField]: masterCard.salonName,
    });

    return state;
  },

  [actions.MASTER_EDIT_SERVICES_SET]: (state, { payload: { masterCard } }) => {
    const manicureCategoryId = state.dictionaries.categoryServiceByKey.Manicure.id;
    const manicureServicesData = find(masterCard.masterServices, { id: manicureCategoryId }).services;
    const manicureServicesModels = state.masterEditor.serviceManicure;

    manicureServicesData.forEach(({ serviceId, price, duration }) => {
      if (serviceId) {
        const serviceKey = state.dictionaries.serviceById[serviceId].key;
        const serviceModel = find(manicureServicesModels, { dictionaryKey: serviceKey });

        serviceModel.price = price;
        serviceModel.duration = duration;
      }
    });

    return state;
  }
}));
