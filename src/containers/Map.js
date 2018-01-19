// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchMasters } from '../actions/Search';
import { setLastMapLocation } from '../actions/Map';
import { getLocation } from '../actions/Common';

import Map from '../components/Serp/Map';

const userLocationSelector = (state) => {
  const city = state.searchForm.general.cities.selected;
  const { userLocation } = state.geo;

  return userLocation.lat
    ? { latitude: userLocation.lat, longitude: userLocation.lon }
    : { latitude: city.lat, longitude: city.lon };
};

const mapStateToProps = (state, ownProps) => ({
  initialRegion: (() => {
    if (state.searchForm.general.place.label) {
      return {
        latitude: state.searchForm.searchQuery.lat,
        longitude: state.searchForm.searchQuery.lon,
      };
    }

    if (state.map.lastLocation != null) {
      return state.map.lastLocation;
    }

    return userLocationSelector(state);
  })(),
  points: state.searchForm.searchResult.items,
  userLocation: userLocationSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getLocation,
    searchMasters,
    setLastMapLocation,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
