import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/Map';

export default makeReducer(() => ({
  [actions.MAP_LAST_LOCATION_SET]: (state, { payload: { location } }) => (
    deepUpdate(state, 'map', {
      lastLocation: location,
    })
  ),
}));
