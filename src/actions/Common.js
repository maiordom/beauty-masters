// @flow

import actions from '../constants/Common';

import { setSearchLocation } from './Search';

export const setActivityIndicator = (animating: boolean) => ({
  type: actions.ACTIVITY_INDICATOR_ANIMATING,
  animating,
});

export const getLocation = (updateSearchQuery: boolean) => (dispatch: Function) => {
  navigator.geolocation.getCurrentPosition((position) => {
    if (position && position.coords) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      dispatch({
        type: actions.USER_LOCATION_SET,
        payload: { lon, lat },
      });

      if (updateSearchQuery) {
        dispatch(setSearchLocation(lat, lon));
      }
    }
  }, (err) => {
    console.log('geo::location::', err);
  }, {
    timeout: 10000,
    maximumAge: 3000,
  });
};

export default null;
