// @flow

import { connect } from 'react-redux';

import SerpList from '../components/Serp/SerpList';

const mapStateToProps = state => {
  const initialRegion = (() => {
    if (state.searchForm.general.place.label) {
      return {
        latitude: state.searchForm.searchQuery.lat,
        longitude: state.searchForm.searchQuery.lon,
      };
    }

    if (state.map.lastLocation != null) {
      return state.map.lastLocation;
    }

    const city = state.searchForm.general.cities.selected;
    const { userLocation } = state.geo;

    return userLocation.lat
      ? { latitude: userLocation.lat, longitude: userLocation.lon }
      : { latitude: city.lat, longitude: city.lon };
  })();

  return {
    initialRegion,
    points: state.searchForm.searchResult.items,
  };
};

export default connect(mapStateToProps, null)(SerpList);
