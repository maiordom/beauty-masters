import find from 'lodash/find';
import reject from 'lodash/reject';

import { intervalGroup } from '../store/Interval';
import { makeReducer, groupServices } from '../utils';

import c from '../constants/MasterCard';

const intervalModel = intervalGroup();

export default makeReducer(() => ({
  [c.MASTER_CARD_SET]: (state, { payload }) => {
    const card = payload;
    state.masterCards[card.id] = card;

    card.services.forEach((service) => {
      service.categoryId = state.dictionaries.serviceById[service.serviceId].categoryId;
    });

    let {
      groupedServicesByCategories,
      groupedServicesBySubCategories
    } = groupServices(
      card.services,
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
