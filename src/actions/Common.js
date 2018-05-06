// @flow

import actions from '../constants/Common';

import { setSearchLocation } from './Search';
import { defer } from '../utils/Defer';
import { log } from '../utils/Log';

export const setActivityIndicator = (animating: boolean) => ({
  type: actions.ACTIVITY_INDICATOR_ANIMATING,
  animating,
});

export const requestGeoAuthorization = () => {
  navigator.geolocation.requestAuthorization();
};

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

      if (updateSearchQuery) {
        dispatch(setSearchLocation(lat, lon));
      }

      deferred.resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    log('geo::location', position);
  }, (exx) => {
    log('geo::location::exx', exx);
    deferred.reject(exx);
  }, {
    timeout: 2000,
  });

  return deferred.promise;
};

export default null;
