// @flow

import { connect } from 'react-redux';

import SerpList from '../components/Serp/SerpList';

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
    initialRegion,
    points: state.searchForm.searchResult.items,
  };
};

export default connect(mapStateToProps, null)(SerpList);
