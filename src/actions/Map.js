// @flow
import actions from '../constants/Map';
import type { TRegionType } from '../types/RegionType';

export const setLastMapLocation = (location: TRegionType) => (dispatch: Function) => {
  dispatch({
    type: actions.LAST_MAP_LOCATION_SET,
    payload: location,
  });
};
