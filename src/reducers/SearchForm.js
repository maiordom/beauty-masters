import reject from 'lodash/reject';
import each from 'lodash/each';
import map from 'lodash/map';
import startsWith from 'lodash/startsWith';
import lowerCase from 'lodash/lowerCase';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import every from 'lodash/every';
import filter from 'lodash/filter';

import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/Search';

const setDepartureServices = (state) => {
  const { homeDeparture } = state.searchForm.general;
  const { homeDepartureServices } = state.dictionaries;
  let queryServices = state.searchForm.searchQuery.service_ids;

  if (homeDeparture.active) {
    homeDepartureServices.forEach((service) => {
      queryServices.push(service.id);
    });
  } else {
    homeDepartureServices.forEach((service) => {
      queryServices = filter(queryServices, (serviceId) => serviceId !== service.id);
    });
  }

  state.searchForm.searchQuery.service_ids = queryServices;

  return state;
};

const setParam = (action, state) => {
  const {
    sectionName, modelName, paramValue, paramName,
  } = action;
  const section = state.searchForm[sectionName];
  const model = section[modelName];

  model[paramName] = paramValue;

  deepUpdate(state, `searchForm.${sectionName}`, { [`${modelName}`]: model });
};

const updateSections = (action, categoryKey, state) => {
  map(state.searchForm[action.sectionName], sectionModel => {
    if (sectionModel.categoryKey === categoryKey) {
      sectionModel.active = action.paramValue;
    }
  });
};

const getServicesCategoriesIds = (state) => {
  const { serviceByKey, categoryServiceByKey } = state.dictionaries;
  const serviceIds = [];
  const categoryIds = [];

  const allServicesWithSubcategories = values({
    ...state.searchForm.serviceManicure,
    ...state.searchForm.servicePedicure,
  });

  const allSubcategories = filter(allServicesWithSubcategories, { isCategory: true, active: true });
  each(allSubcategories, subcategory => {
    categoryIds.push(categoryServiceByKey[subcategory.dictionaryKey].id);
  });

  const allServices = filter(allServicesWithSubcategories, (item) => (!item.isCategory));
  const servicesByCategory = groupBy(allServices, 'categoryDictionaryKey');
  each(servicesByCategory, (services, categoryKey) => {
    if (every(services, { active: true })) {
      categoryIds.push(categoryServiceByKey[categoryKey].id);
    } else {
      const activeServices = filter(services, { active: true });
      each(activeServices, service => {
        serviceIds.push(serviceByKey[service.dictionaryKey].id);
      });
    }
  });

  return {
    serviceIds,
    categoryIds,
  };
};

const updateSearchQueryWithServicesCategoriesIds = (state) => {
  const { serviceIds, categoryIds } = getServicesCategoriesIds(state);
  const { searchQuery } = state.searchForm;

  searchQuery.service_ids = serviceIds;
  searchQuery.category_service_ids = categoryIds;

  setDepartureServices(state);
};

export default makeReducer((state, action) => ({
  [actions.SEARCH_SERVICE_TOGGLE]: (state, { payload }) => {
    const { id } = payload;

    setParam(payload, state);
    updateSections(payload, id, state);
    updateSearchQueryWithServicesCategoriesIds(state);

    return state;
  },

  [actions.SEARCH_SERVICE_CATEGORY_TOGGLE]: (state, { payload }) => {
    const { id } = payload;

    setParam(payload, state);
    updateSections(payload, id, state);
    updateSearchQueryWithServicesCategoriesIds(state);

    return state;
  },

  [actions.SEARCH_MANICURE_TOGGLE]: (state, { payload: { paramValue } }) => {
    const categoryKey = 'manicure';
    const serviceManicure = { sectionName: 'serviceManicure', paramValue };

    updateSections(serviceManicure, categoryKey, state);
    updateSearchQueryWithServicesCategoriesIds(state);

    return state;
  },

  [actions.SEARCH_PEDICURE_TOGGLE]: (state, { payload: { paramValue } }) => {
    const categoryKey = 'pedicure';
    const serviceManicure = { sectionName: 'servicePedicure', paramValue };

    updateSections(serviceManicure, categoryKey, state);
    updateSearchQueryWithServicesCategoriesIds(state);

    return state;
  },

  [actions.SEARCH_EXTENSION_TOGGLE]: (state, { payload: { paramValue } }) => {
    const categoryKey = 'extension';
    const servicePedicure = { sectionName: 'servicePedicure', paramValue };
    const serviceManicure = { sectionName: 'serviceManicure', paramValue };

    updateSections(servicePedicure, categoryKey, state);
    updateSections(serviceManicure, categoryKey, state);
    updateSearchQueryWithServicesCategoriesIds(state);

    return state;
  },

  [actions.SEARCH_WITHDRAWAL_TOGGLE]: (state, { payload: { paramValue } }) => {
    const categoryKey = 'removing';
    const servicePedicure = { sectionName: 'servicePedicure', paramValue };
    const serviceManicure = { sectionName: 'serviceManicure', paramValue };

    updateSections(servicePedicure, categoryKey, state);
    updateSections(serviceManicure, categoryKey, state);
    updateSearchQueryWithServicesCategoriesIds(state);

    return state;
  },

  [actions.SEARCH_SET_DAY]: (state, { day }) => {
    const { dates } = state.searchForm.searchQuery;

    if (dates.includes(day)) {
      state.searchForm.searchQuery.dates = dates.filter((date) => date !== day);
    } else {
      dates.push(day);
    }

    return state;
  },

  [actions.SEARCH_MASTER_TYPE_SET]: () => {
    const { modelName, id, sectionName } = action;
    const model = state.searchForm[sectionName][modelName];

    each(model.items, (item) => {
      item.active = item.id === id;

      if (item.active) {
        model.selected = item;
      }
    });

    deepUpdate(state, `searchForm.${sectionName}.${modelName}`, { items: [...model.items] });

    if (model.selected.value) {
      state.searchForm.searchQuery.is_salon = model.selected.value;
    } else {
      delete state.searchForm.searchQuery.is_salon;
    }

    return state;
  },

  [actions.SEARCH_MASTERS_ITEMS_SET]: () => {
    const { items } = action;

    items.forEach((item) => {
      item.services = reject(item.services, (service) => service.id === null || service.id === undefined);

      item.services.forEach((service) => {
        service.title = state.dictionaries.serviceById[service.id].title;
      });
    });

    deepUpdate(state, 'searchForm.searchResult', { items });

    return state;
  },

  [actions.SEARCH_MASTERS_LIST_ITEMS_SET]: () => {
    const { items } = action;

    items.forEach((item) => {
      item.services = reject(item.services, (service) => service.id === null || service.id === undefined);

      item.services.forEach((service) => {
        service.title = state.dictionaries.serviceById[service.id].title;
      });
    });

    deepUpdate(state, 'searchForm.searchListResult', { items });

    return state;
  },

  [actions.SEARCH_LOCATION_SET]: (state, { payload: { lat, lon } }) =>
    deepUpdate(state, 'searchForm.searchQuery', {
      lat,
      lon,
    }),

  [actions.SEARCH_LOCATION_NAME_SET]: (state, { payload: { label } }) =>
    deepUpdate(state, 'searchForm.general.place', {
      label,
    }),

  [actions.SEARCH_DEPARTURE_TOGGLE]: () => {
    const { homeDeparture } = state.searchForm.general;
    const isActive = homeDeparture.active;

    homeDeparture.active = !isActive;

    setDepartureServices(state);

    return deepUpdate(state, 'searchForm.general.homeDeparture', {
      active: !isActive,
    });
  },

  [actions.SEARCH_CITY_SET]: () => {
    const { cities } = state.searchForm.general;
    const selected = cities.items.find((city) => city.id === action.id);

    deepUpdate(state, 'searchForm.searchQuery', {
      lat: selected.lat,
      lon: selected.lon,
    });

    return deepUpdate(state, 'searchForm.general.cities', { selected });
  },

  [actions.SEARCH_CITY_FIND]: (state, { payload: { text } }) => {
    const { cities } = state.searchForm.general;
    const filtered = filter(cities.items, (city) => (
      startsWith(lowerCase(city.name), lowerCase(text))));

    return deepUpdate(state, 'searchForm.general.cities', { filtered });
  },

  [actions.SEARCH_CITY_RESET]: (state, { payload: { cities } }) =>
    deepUpdate(state, 'searchForm.general.cities', {
      items: cities,
      filtered: null,
    }),
}));
