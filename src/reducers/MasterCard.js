import find from 'lodash/find';
import reject from 'lodash/reject';

import { makeReducer, groupServices } from '../utils';

import c from '../constants/MasterCard';

export default makeReducer(() => ({
  [c.MASTER_CARD_SET]: (state, { payload }) => {
    state.masterCards[payload.id] = payload;

    payload.services.forEach(service => {
      service.categoryId = state.dictionaries.serviceById[service.serviceId].categoryId;
    });

    let groupedServices = groupServices(
      payload.services,
      state.dictionaries,
    );

    const handlingToolsId = state.dictionaries.categoryServiceByKey.HandlingTools.id;

    const handlingTools = find(groupedServices, { id: handlingToolsId });

    if (handlingTools) {
      payload.handlingTools = handlingTools.services;
      groupedServices = reject(groupedServices, { id: handlingToolsId });
    }

    payload.services = groupedServices;

    return state;
  },
}));
