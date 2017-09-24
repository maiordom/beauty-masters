// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchMasters } from '../actions/Search';

import Map from '../components/Serp/Map';

const mapStateToProps = (state, ownProps) => ({
  initialRegion: state.geo.userLocation.lat
    ? state.geo.userLocation
    : state.geo.city.location,
  points: state.searchForm.searchResult.items,
  sceneKey: ownProps.sceneKey,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ searchMasters }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
