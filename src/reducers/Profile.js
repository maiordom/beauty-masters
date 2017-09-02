import { makeReducer } from '../utils';

import c from '../constants/profile';

export default makeReducer((state, action) => ({
  [c.PROFILE_SET_DATA]: () => {
    const { email, userId, masterCards } = action;

    state.profile = {
      email,
      userId,
      masterCards,
    };

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
