// @flow

import { connect } from 'react-redux';

import MasterCardServices from '../components/MasterCard/MasterCardServices';

const mapStateToProps = (state) => ({
  services: state.profile.services,
});

export default connect(mapStateToProps)(MasterCardServices);
