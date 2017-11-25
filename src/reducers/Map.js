import { makeReducer } from '../utils';

import constants from '../constants/Map';

export default makeReducer(() => ({
  [constants.LAST_MAP_LOCATION_SET]: (state, { payload }) => {
    state.map.lastLocation = payload;
    return state;
  },
}));
