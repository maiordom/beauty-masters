import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import NavBar from '../../components/NavBar';
import MasterProfileSelectProfile from '../../components/MasterProfile/MasterProfileSelectProfile';

import { selectMainMaster } from '../../actions/profile';

const mapStateToProps = (state) => ({
  items: state.profile.masterCards,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators({ selectMainMaster }, dispatch),
    routeToCreateMasterCard: Actions.masterEditorGeneral,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterProfileSelectProfile));
