// @flow
import actions from '../constants/Map';
import type { TRegionType } from '../types/RegionType';

export const setLastMapLocation = (location: TRegionType) => (dispatch: Function) => {
  dispatch({
    type: actions.MAP_LAST_LOCATION_SET,
    payload: { location },
  });
};
