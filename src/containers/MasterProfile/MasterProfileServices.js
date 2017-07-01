import { connect } from 'react-redux';

import MasterProfileServices from '../../components/MasterProfile/MasterProfileServices';

const mapStateToProps = (state) => ({
  services: state.profile.services,
});

export default connect(mapStateToProps)(MasterProfileServices);
