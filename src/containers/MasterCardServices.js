// @flow

import { connect } from 'react-redux';

import { getServices } from '../utils';

import MasterCardServices from '../components/MasterCard/MasterCardServices';

const mapStateToProps = (state, ownProps) => {
  const servicesDictionaries = {
    ...state.searchForm.serviceManicure,
    ...state.searchForm.servicePedicure,
  };

  return getServices(ownProps.services, servicesDictionaries);
};

export default connect(mapStateToProps)(MasterCardServices);
