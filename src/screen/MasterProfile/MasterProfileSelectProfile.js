import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavBar from '../../components/NavBar';
import MasterProfileSelectProfile from '../../components/MasterProfile/MasterProfileSelectProfile';

import { selectMainMaster } from '../../actions/profile';

const mapStateToProps = (state) => ({
  items: state.userMasters
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ selectMainMaster }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterProfileSelectProfile));
