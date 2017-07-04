import { connect } from 'react-redux';

import MasterProfileInfo from '../../components/MasterProfile/MasterProfileInfo';

const mapStateToProps = (state) => ({
  ...state.profile,
});


export default connect(mapStateToProps)(MasterProfileInfo);