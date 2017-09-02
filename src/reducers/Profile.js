import { makeReducer } from '../utils';

import c from '../constants/profile';

export default makeReducer((state, action) => ({
  [c.PROFILE_SET_DATA]: () => {
    const { userId, masterCards } = action;

    state.profile = {
      userId,
      masterCards,
    };

    return state;
  },

  [c.PROFILE_SET_MAIN]: () => {
    const { index } = action;

    state.userMasters.forEach((master, masterIndex) => {
      master.isMain = masterIndex === index;
    });

    state.userMasters = [...state.userMasters];

    return state;
  },
}));
