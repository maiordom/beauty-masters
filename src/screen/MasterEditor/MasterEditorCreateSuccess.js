import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { createMaster } from '../../actions/Master';

import MasterEditorCreateSuccess from '../../components/MasterEditor/MasterEditorCreateSuccess';
import NavBar from '../../components/NavBar';

import { isSalon } from '../../utils/isSalon';

const mapStateToProps = (state) => ({
  isSalon: isSalon(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators({ createMaster }, dispatch),
    routeToPresentation: Actions.presentation,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorCreateSuccess));
