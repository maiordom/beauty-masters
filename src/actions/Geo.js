import * as GeoServices from '../services/Geo';
import config from '../config';

import actions from '../constants/Common';

export const searchPlace = ({
  input,
  language = 'ru',
  location,
  radius = 30000,
}) => (dispatch, getState) => {
  const cityLocation = getState().geo.city.location;
  const { lat, lng } = (location || cityLocation);
  const params = {
    input,
    key: config.googlePlacesKey,
    language,
    location: `${lat},${lng}`,
    radius,
  };

  return GeoServices.placesAutocomplete(params).then(res => {
    if (res.error) {
      dispatch(placesReset());
      return;
    }

    dispatch({
      type: actions.GEO_DATA_SET,
      places: res.places,
    });
  });
};

export const placesReset = () => ({
  type: actions.GEO_DATA_CLEAR,
});

export const getPlaceDetails = (place) => {
  const params = {
    key: config.googlePlacesKey,
    placeid: place.placeId,
  };

  return GeoServices.getPlaceDetails(params);
};

export default null;
