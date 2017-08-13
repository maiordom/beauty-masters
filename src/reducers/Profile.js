import { makeReducer, groupServices } from '../utils';

import c from '../constants/profile';

export default makeReducer((state, action) => ({
  [c.PROFILE_SET_DATA]: () => {
    const { data } = action;

    state.profile = data;

    state.profile.services = groupServices(state.profile.services, state.dictionaries.services);

    return state;
  },

  [c.PROFILE_SET_MAIN]: () => {
    const { index } = action;

    state.userMasters.forEach((master, masterIndex) => {
      master.isMain = masterIndex === index;
    });

    state.userMasters = [ ...state.userMasters ];

    return state;
  }
}));
