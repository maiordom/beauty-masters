import { connect } from 'react-redux';

import { getServices } from '../../utils';

import MasterProfileServices from '../../components/MasterProfile/MasterProfileServices';

import profileData from '../../test/ProfileData';

const mapStateToProps = (state) => getServices(profileData, state.dictionaries.services);

export default connect(mapStateToProps)(MasterProfileServices);
