import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { createMaster } from '../../actions/Master';

import MasterEditorCreateSuccess from '../../components/MasterEditor/MasterEditorCreateSuccess';
import NavBar from '../../components/NavBar';

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators({ createMaster }, dispatch),
    routeToPresentation: Actions.presentation,
  },
});

export default connect(null, mapDispatchToProps)(NavBar(MasterEditorCreateSuccess));
