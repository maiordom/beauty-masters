import { makeReducer, groupServices } from '../utils';

import constants from '../constants/profile';

export default makeReducer((state, action) => ({
  [constants.PROFILE_SET_DATA]: () => {
    const { data } = action;

    state.profile = data;

    state.profile.services = groupServices(state.profile.services, state.dictionaries.services);

    return state;
  },
}));
