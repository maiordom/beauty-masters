import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { drawerOpen } from '../../actions/Drawer';
import { removePhoto, createMaster, setGeneralParam } from '../../actions/Master';
import { setPhotos } from '../../actions/MasterEdit';

import MasterEditorInfo from '../../components/MasterEditor/MasterEditorInfo';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  ...state.masterEditor.info,
  cardType: state.masterEditor.cardType,
  editStatus: state.masterEditor.editStatus,
  masterCardId: state.masterEditor.masterCardId,
  sectionName: 'info',
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({
      createMaster,
      removePhoto,
      setGeneralParam,
      setPhotos,
    }, dispatch),
    drawerOpen,
    next: Actions.createMasterSuccess,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorInfo));
