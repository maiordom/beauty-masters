import { makeReducer } from '../utils';

import type { TProfileData } from '../types/ProfileData';

import c from '../constants/Profile';

export default makeReducer((state, action) => ({
  [c.PROFILE_SET_DATA]: () => {
    const { email, userId, masterCards } = action;

    const profile: TProfileData = {
      email,
      masterCards,
      userId,
    };

    state.profile = profile;
    return state;
  },

  [c.PROFILE_SET_MAIN]: () => {
    const { index } = action;

    state.profile.masterCards.forEach((card, masterIndex) => {
      card.isMain = masterIndex === index;
    });

    state.profile.masterCards = [...state.profile.masterCards];

    return state;
  },
}));
