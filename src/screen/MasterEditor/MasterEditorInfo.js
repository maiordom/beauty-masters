import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { drawerOpen } from '../../actions/drawer';
import { removePhoto, createMaster, setGeneralParam } from '../../actions/master';

import MasterEditorInfo from '../../components/MasterEditor/MasterEditorInfo';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  ...state.masterEditor.info,
  sectionName: 'info',
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({
      createMaster,
      removePhoto,
      setGeneralParam,
    }, dispatch),
    drawerOpen,
    next: Actions.createMasterSuccess,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorInfo));
