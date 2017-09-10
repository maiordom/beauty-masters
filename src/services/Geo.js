import { geo } from '../utils/Provider';
import { geoRoutes } from '../routes';

export const placesAutocomplete = (params) =>
  geo(geoRoutes.autocomplete, params).then(res => (res.error ? res : {
    places: res.predictions.map(prediction => ({
      placeId: prediction.place_id,
      label: prediction.description,
    })),
  }));

export const getPlaceDetails = (params) =>
  geo(geoRoutes.details, params).then(res => (res.error ? res : {
    location: res.result.geometry.location,
  }));

export default null;
