import { connect } from 'react-redux';

import { getServices } from '../../utils';

import MasterProfileServices from '../../components/MasterProfile/MasterProfileServices';

import masterCardData from '../../test/MasterCardData';

const mapStateToProps = (state) => getServices(masterCardData.services, state.dictionaries.services);

export default connect(mapStateToProps)(MasterProfileServices);
