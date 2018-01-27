// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchMastersList } from '../actions/Search';

import SerpList from '../components/Serp/SerpList';

const userLocationSelector = (state) => {
  const city = state.searchForm.general.cities.selected;
  const { userLocation } = state.geo;

  return userLocation.lat
    ? { latitude: userLocation.lat, longitude: userLocation.lon }
    : { latitude: city.lat, longitude: city.lon };
};

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
    points: state.searchForm.searchListResult.items,
    userLocation: userLocationSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    searchMastersList,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SerpList);
