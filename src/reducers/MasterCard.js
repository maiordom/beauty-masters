import find from 'lodash/find';
import reject from 'lodash/reject';

import { intervalGroup } from '../store/Interval';
import { makeReducer, groupServices } from '../utils';

import c from '../constants/MasterCard';

const intervalModel = intervalGroup();

export default makeReducer(() => ({
  [c.MASTER_CARD_SET]: (state, { payload }) => {
    state.masterCards[payload.id] = payload;

    payload.services.forEach((service) => {
      service.categoryId = state.dictionaries.serviceById[service.serviceId].categoryId;
    });

    let groupedServices = groupServices(
      payload.services,
      state.dictionaries,
    ).groupedServicesByCategories;

    const handlingToolsId = state.dictionaries.categoryServiceByKey.HandlingTools.id;
    const handlingTools = find(groupedServices, { id: handlingToolsId });

    if (handlingTools) {
      payload.handlingTools = handlingTools.services;
      groupedServices = reject(groupedServices, { id: handlingToolsId });
    }

    payload.services = groupedServices;

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
