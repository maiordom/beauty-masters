// @flow
import type { TRegionType } from '../../types/RegionType';

export type TMapState = {
  lastLocation: ?TRegionType
};

const initialState: TMapState = {
  lastLocation: null,
};

export default initialState;
