import { makeReducer, groupServices } from '../utils';

import constants from '../constants/masterCard';

export default makeReducer((state, action) => ({
  [constants.MASTER_CARD_SET_DATA]: () => {
    const { masterData } = action;

    state.masterCards[masterData.id] = masterData;

    state.masterCards[masterData.id].services = groupServices(masterData.services, state.dictionaries.services);

    console.log('state.masterCards', state.masterCards);

    return state;
  },
}));
