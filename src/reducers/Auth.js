import { makeReducer } from '../utils';

import actions from '../constants/auth';

export default makeReducer((state, action) => ({
  [actions.AUTH_SET_USER_ID]: () => {
    const { userId } = action;

    state.auth = {
      userId,
    };

    return state;
  },
}));
