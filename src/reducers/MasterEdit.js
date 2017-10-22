import find from 'lodash/find';

import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/MasterEdit';

import {
  setCreateQueryParam,
  setItemById,
  setParam,
  setScheduleQuery,
} from './MasterEditorHelpers';

const setPhotos = ({
  model,
  data,
}) => {
  data.forEach((item) => {
    model.items.push({
      mediaFileId: item.mediaFileId,
      sizes: item.sizes,
      status: 'uploaded',
      type: 'photo',
    });
  });
};

const setHandlingTools = ({
  servicesData,
  servicesModels,
  servicesQuery,
  state,
}) => {
  servicesData.forEach(({ categoryId, serviceId, price, duration, title }) => {
    if (serviceId) {
      const serviceKey = state.dictionaries.serviceById[serviceId].key;
      const serviceModel = find(servicesModels, { dictionaryKey: serviceKey });

      serviceModel.value = true;
      servicesQuery.push({
        attributes: {
          category_service_id: categoryId,
          duration,
          price,
          service_id: serviceId,
        },
      });
    }
  });
};

const setServices = ({
  servicesData,
  servicesModels,
  servicesQuery,
  customServices,
  customServicesQuery,
  state,
}) => {
  servicesData.forEach(({ categoryId, serviceId, price, duration, title }) => {
    if (serviceId) {
      const serviceKey = state.dictionaries.serviceById[serviceId].key;
      const serviceModel = find(servicesModels, { dictionaryKey: serviceKey });

      serviceModel.active = true;
      serviceModel.duration = duration;
      serviceModel.price = price;

      servicesQuery.push({
        attributes: {
          category_service_id: categoryId,
          duration,
          price,
          service_id: serviceId,
        },
      });
    } else {
      customServices.items.push({
        active: true,
        duration,
        price,
        title,
      });

      customServicesQuery.push({
        attributes: {
          category_service_id: categoryId,
          duration,
          price,
          title,
        },
      })
    }
  });
};

export default makeReducer((state, action) => ({
  [actions.MASTER_EDIT_CALENDARS_SET]: (state, { payload: { masterCard } }) => {
    const calendarsMapping = [
      {
        model: state.masterEditor.calendarSettingsOne,
        name: 'calendarSettingsOne',
      },
      {
        model: state.masterEditor.calendarSettingsTwo,
        name: 'calendarSettingsTwo',
      },
      {
        model: state.masterEditor.calendarSettingsThree,
        name: 'calendarSettingsThree',
      },
    ];

    const createPayload = (
      sectionName,
      modelName,
      paramValue,
      paramName,
    ) => ({
      sectionName,
      modelName,
      paramValue,
      paramName,
    });

    masterCard.addresses.map((address, index) => {
      const {
        model: calendarModel,
        name: sectionName,
      } = calendarsMapping[index];

      calendarModel.addressId = address.id;
      calendarModel.timeTableId = address.timeTable.id;

      [
        createPayload(sectionName, 'salonTitleField', address.name, 'value'),
        createPayload(sectionName, 'addressField', address.address, 'value'),
        createPayload(sectionName, 'cityField', address.city, 'value'),
        createPayload(sectionName, 'subwayStationField', address.subwayStation, 'value'),
      ].forEach((payload) => {
        setParam(payload, state);
        setCreateQueryParam(payload, state, 'createAddressQuery');
      });

      [
        createPayload(sectionName, 'timeStartField', address.timeTable.timeStart, 'value'),
        createPayload(sectionName, 'timeEndField', address.timeTable.timeEnd, 'value'),
        createPayload(sectionName, 'startDateField', address.timeTable.dateStart, 'value'),
      ].forEach((payload) => {
        setParam(payload, state);
        setCreateQueryParam(payload, state, 'createTimeTableQuery');
      });

      calendarModel.customDates.items = address.schedules.map((schedule) => {
        const scheduleObject = {
          date: schedule.date,
          timeStart: schedule.timeStart,
          timeEnd: schedule.timeEnd,
          workInThisDay: !schedule.isNotWork,
        };

        setScheduleQuery({ sectionName }, state, scheduleObject);

        return scheduleObject;
      });

      const intervalGroupPayload = {
        modelName: 'intervalGroup',
        id: address.timeTable.intervalType,
        sectionName,
      };

      setItemById(intervalGroupPayload, state);
      setCreateQueryParam(intervalGroupPayload, state, 'createTimeTableQuery');
    });

    deepUpdate(state, `masterEditor.editStatus`, { addresses: 'uploaded' });

    return state;
  },

  [actions.MASTER_EDIT_GENERAL_INFO_SET]: (state, { payload: { masterCard } }) => {
    const generalSection = state.masterEditor.generalSection;
    const infoSection = state.masterEditor.info;

    generalSection.isSalonField.value = masterCard.isSalon;
    generalSection.phoneField.value = masterCard.phone;
    generalSection.salonNameField.value = masterCard.salonName;
    generalSection.usernameField.value = masterCard.username;
    infoSection.aboutField.value = masterCard.about;

    Object.assign(state.masterEditor.createMasterQuery, {
      [generalSection.isSalonField.queryParam]: Number(masterCard.isSalon),
      [generalSection.phoneField.queryParam]: masterCard.phone,
      [generalSection.salonNameField.queryParam]: masterCard.salonName,
      [generalSection.usernameField.queryParam]: masterCard.username,
      [infoSection.aboutField.queryParam]: masterCard.about,
    });

    deepUpdate(state, 'masterEditor.editStatus', { general: 'uploaded' });

    return state;
  },

  [actions.MASTER_EDIT_MANICURE_SERVICES_SET]: (state, { payload: { masterCard } }) => {
    const manicureCategoryId = state.dictionaries.categoryServiceByKey.Manicure.id;
    const manicureServicesData = find(masterCard.masterServices, { id: manicureCategoryId }).services;
    const manicureServicesModels = state.masterEditor.serviceManicure;
    const {
      manicureCustomServicesQuery,
      masterServicesQuery,
    } = state.masterEditor;
    const { manicureCustomServices } = state.masterEditor.services;

    setServices({
      servicesData: manicureServicesData,
      servicesModels: manicureServicesModels,
      servicesQuery: masterServicesQuery,
      customServices: manicureCustomServices,
      customServicesQuery: manicureCustomServicesQuery,
      state,
    });

    return state;
  },

  [actions.MASTER_EDIT_PEDICURE_SERVICES_SET]: (state, { payload: { masterCard } }) => {
    const pedicureCategoryId = state.dictionaries.categoryServiceByKey.Pedicure.id;
    const pedicureServicesData = find(masterCard.masterServices, { id: pedicureCategoryId }).services;
    const pedicureServicesModels = state.masterEditor.servicePedicure;
    const {
      pedicureCustomServicesQuery,
      masterServicesQuery,
    } = state.masterEditor;
    const { pedicureCustomServices } = state.masterEditor.services;

    setServices({
      servicesData: pedicureServicesData,
      servicesModels: pedicureServicesModels,
      servicesQuery: masterServicesQuery,
      customServices: pedicureCustomServices,
      customServicesQuery: pedicureCustomServicesQuery,
      state,
    });

    return state;
  },

  [actions.MASTER_EDIT_HANDLING_TOOLS_SET]: (state, { payload: { masterCard } }) => {
    const handlingToolsCategoryId = state.dictionaries.categoryServiceByKey.HandlingTools.id;
    const handlingToolsData = find(masterCard.masterServices, { id: handlingToolsCategoryId }).services;
    const handlingToolsModels = state.masterEditor.handlingTools;
    const { masterServicesQuery } = state.masterEditor;

    setHandlingTools({
      servicesData: handlingToolsData,
      servicesModels: handlingToolsModels,
      servicesQuery: masterServicesQuery,
      state,
    });

    deepUpdate(state, 'masterEditor.editStatus', { services: 'uploaded' });

    return state;
  },

  [actions.MASTER_EDIT_STATUS_SET]: (state, { payload: { masterCardId } }) => {
    if (state.masterEditor.cardType === 'edit' &&
      state.masterEditor.masterCardId === masterCardId
    ) {
      return state;
    }

    return deepUpdate(state, 'masterEditor', {
      cardType: 'edit',
      editStatus: {
        general: 'required',
        services: 'required',
        addresses: 'required',
        photos: 'required'
      },
      masterCardId,
    });
  },

  [actions.MASTER_EDIT_PHOTOS_SET]: (state, { payload: { masterCard } }) => {
    const { masterPhotos, certificatePhotos, workPhotos } = masterCard;

    setPhotos({ model: state.masterEditor.info.certificatePhotos, data: certificatePhotos});
    setPhotos({ model: state.masterEditor.info.personalPhotos, data: masterPhotos});
    setPhotos({ model: state.masterEditor.info.workPhotos, data: workPhotos});

    deepUpdate(state, 'masterEditor.editStatus', { photos: 'uploaded' });
    return state;
  }
}));
