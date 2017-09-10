import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavBar from '../../components/NavBar';
import MasterProfile from '../../components/MasterProfile/MasterProfile';

import { getUserProfile } from '../../actions/Profile';

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getUserProfile }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterProfile));
