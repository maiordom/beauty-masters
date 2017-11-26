// @flow

import { connect } from 'react-redux';

import SerpList from '../components/Serp/SerpList';

import getDistance from '../utils/Geo';

const mapStateToProps = state => {
  const initialRegion = (() => {
    if (state.searchForm.general.place.label) {
      return {
        lat: state.searchForm.searchQuery.lat,
        lon: state.searchForm.searchQuery.lon,
      };
    }

    return state.geo.userLocation.lat
      ? state.geo.userLocation
      : { lat: state.geo.city.location.lat, lon: state.geo.city.location.lng };
  })();

  return {
    points: state.searchForm.searchResult.items.map((point: TMapCard) => {
      const distance = getDistance(
        point.coordinates.latitude,
        point.coordinates.longitude,
        initialRegion.lat,
        initialRegion.lon,
      ).toFixed(2);

      return {
        ...point,
        distance,
      };
    }),
  };
};

export default connect(mapStateToProps, null)(SerpList);
