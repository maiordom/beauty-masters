// @flow

import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchMasters } from '../actions/search';

import Map from '../components/Serp/Map';

const mapStateToProps = (state, ownProps) => ({
  sceneKey: ownProps.sceneKey,
  points: state.searchForm.searchResult.items,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ searchMasters }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);