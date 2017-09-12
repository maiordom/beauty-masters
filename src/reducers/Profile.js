import find from 'lodash/find';

import { makeReducer } from '../utils';

import type { TProfileData } from '../types/ProfileData';

import c from '../constants/Profile';

export default makeReducer((state, action) => ({
  [c.PROFILE_DATA_SET]: () => {
    const { email, userId, masterCards } = action;

    const profile: TProfileData = {
      email,
      masterCards,
      userId,
    };

    state.profile = profile;
    return state;
  },

  [c.PROFILE_MAIN_SET]: () => {
    const { index } = action;

    state.profile.masterCards.forEach((card, masterIndex) => {
      card.isMain = masterIndex === index;
    });

    state.profile.masterCards = [...state.profile.masterCards];

    return state;
  },

  [c.PROFILE_ADDRESSES_SET]: (state, { payload: { addresses, masterCardId } }) => {
    const masterCard = find(state.profile.masterCards, { id: masterCardId });

    if (masterCard) {
      masterCard.addresses = addresses;
    }

    return state;
  },
}));
