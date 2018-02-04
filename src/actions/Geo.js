import * as GeoServices from '../services/Geo';
import * as CityService from '../services/City';
import config from '../config';

import actions from '../constants/Common';

export const searchPlace = ({
  input,
  language = 'ru',
  location,
  radius = 10000,
  type = 'address',
}) => (dispatch, getState) => {
  const cityLocation = getState().searchForm.general.cities.selected;
  const { lat, lon } = (location || cityLocation);
  const params = {
    input,
    key: config.googlePlacesKey,
    language,
    location: `${lat},${lon}`,
    radius,
    type,
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

export const placeSet = (place) => ({
  type: actions.GEO_PLACE_SET,
  payload: { place },
});

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

export const fetchCities = () => (dispatch: Function) => (
  CityService.getCities().then((res: Object) => {
    if (!res.error) {
      dispatch({
        type: actions.GEO_CITIES_SET,
        payload: { cities: res.cities },
      });
    }
  })
);

export default null;
