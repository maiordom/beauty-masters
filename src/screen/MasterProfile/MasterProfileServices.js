import { connect } from 'react-redux';

import { getServices } from '../../utils';

import MasterProfileServices from '../../components/MasterProfile/MasterProfileServices';

import masterCardData from '../../test/MasterCardData';


const mapStateToProps = (state) => {
  const servicesDictionaries = {
    ...state.searchForm.serviceManicure,
    ...state.searchForm.servicePedicure,
  };

  return getServices(masterCardData.services, servicesDictionaries);
};

export default connect(mapStateToProps)(MasterProfileServices);
