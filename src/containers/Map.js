// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchMasters } from '../actions/Search';
import { setLastMapLocation } from '../actions/Map';

import Map from '../components/Serp/Map';

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

    return state.geo.userLocation.lat
      ? { latitude: state.geo.userLocation.lat, longitude: state.geo.userLocation.lon }
      : { latitude: state.geo.city.location.lat, longitude: state.geo.city.location.lng };
  })(),
  points: state.searchForm.searchResult.items,
  sceneKey: ownProps.sceneKey,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ searchMasters, setLastMapLocation }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
