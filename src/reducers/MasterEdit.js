import find from 'lodash/find';

import { makeReducer } from '../utils';

import actions from '../constants/MasterEdit';

import {
  setCreateQueryParam,
  setItemById,
  setParam,
  setScheduleQuery,
} from './MasterEditorHelpers';

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

    return state;
  },

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

    return state;
  }
}));
