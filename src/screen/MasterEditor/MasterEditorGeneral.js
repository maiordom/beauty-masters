import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { setGeneralParam, createMaster } from '../../actions/Master';

import MasterEditorGeneral from '../../components/MasterEditor/MasterEditorGeneral';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  ...state.masterEditor.generalSection,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({ setGeneralParam, createMaster }, dispatch),
    next: Actions.masterEditorService,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorGeneral));
