// @flow

import actions from '../constants/Common';

import { setSearchLocation } from './Search';
import { defer } from '../utils/Defer';

export const setActivityIndicator = (animating: boolean) => ({
  type: actions.ACTIVITY_INDICATOR_ANIMATING,
  animating,
});

export const getLocation = (updateSearchQuery: boolean) => (dispatch: Function) => {
  const deferred = defer();

  navigator.geolocation.getCurrentPosition((position) => {
    if (position && position.coords) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      dispatch({
        type: actions.USER_LOCATION_SET,
        payload: { lat, lon },
      });

      console.log('geo::location::', position.coords);

      if (updateSearchQuery) {
        dispatch(setSearchLocation(lat, lon));
      }

      deferred.resolve(position.coords);
    }
  }, (err) => {
    deferred.reject(err);
  });

  return deferred.promise;
};

export default null;
