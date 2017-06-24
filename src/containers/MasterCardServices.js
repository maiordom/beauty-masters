// @flow

import { connect } from 'react-redux';

import { groupServices } from '../utils';

import MasterCardServices from '../components/MasterCard/MasterCardServices';

const mapStateToProps = (state, ownProps) => ({
  services: groupServices(ownProps.services, state.dictionaries.services),
});

export default connect(mapStateToProps)(MasterCardServices);
