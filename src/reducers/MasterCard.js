import find from 'lodash/find';
import reject from 'lodash/reject';
import includes from 'lodash/includes';

import { intervalGroup } from '../store/Interval';
import { makeReducer, groupServices } from '../utils';

import c from '../constants/MasterCard';

const intervalModel = intervalGroup();

const HOME_DEPARTURE_MANICURE_SERVICE_ID = 61;
const HOME_DEPARTURE_PEDICURE_SERVICE_ID = 62;
const HOME_DEPARTURE_SERVICE_IDS = [HOME_DEPARTURE_MANICURE_SERVICE_ID, HOME_DEPARTURE_PEDICURE_SERVICE_ID];

export default makeReducer(() => ({
  [c.MASTER_CARD_SET]: (state, { payload }) => {
    const card = payload;
    state.masterCards[card.id] = card;

    card.services.forEach((service) => {
      service.categoryId = state.dictionaries.serviceById[service.serviceId].categoryId;
    });

    // Filter out home departure services: manicure home departure extracted and passed as separate field to state.
    const commonServices = reject(card.services, service => includes(HOME_DEPARTURE_SERVICE_IDS, service.serviceId));
    card.homeDepartureService = find(card.services, service => service.serviceId === HOME_DEPARTURE_MANICURE_SERVICE_ID);

    let {
      groupedServicesByCategories,
      groupedServicesBySubCategories,
    } = groupServices(
      commonServices,
      state.dictionaries,
    );

    const handlingToolsId = state.dictionaries.categoryServiceByKey.HandlingTools.id;
    const handlingTools = find(groupedServicesByCategories, { id: handlingToolsId });

    if (handlingTools) {
      card.handlingTools = handlingTools.services;
      groupedServicesByCategories = reject(groupedServicesByCategories, { id: handlingToolsId });
      groupedServicesBySubCategories = reject(groupedServicesBySubCategories, { id: handlingToolsId });
    }

    card.services = groupedServicesByCategories;
    card.groupedServices = groupedServicesBySubCategories;

    return state;
  },

  [c.MASTER_CARD_ADDRESSES_SET]: (state, { payload: { addresses, masterCardId } }) => {
    const masterCard = state.masterCards[masterCardId];

    masterCard.addresses = addresses;

    addresses.forEach(address => {
      const interval = find(intervalModel.items, { id: address.timeTable.intervalType });

      address.timeTable.intervalKey = interval.key;
    });

    return state;
  },
}));
