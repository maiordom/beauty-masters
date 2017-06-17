// @flow

import { connect } from 'react-redux';

import SerpList from '../components/Serp/SerpList';

const mapStateToProps = state => ({
  points: state.searchForm.searchResult.items,
});

export default connect(mapStateToProps, null)(SerpList);
