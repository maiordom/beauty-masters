import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { drawerOpen } from '../../actions/Drawer';
import { removePhoto, createMaster, setGeneralParam } from '../../actions/Master';
import { getPhotos } from '../../actions/MasterEdit';

import MasterEditorInfo from '../../components/MasterEditor/MasterEditorInfo';
import NavBar from '../../components/NavBar';

import { isSalon } from '../../utils/isSalon';

const mapStateToProps = state => ({
  ...state.masterEditor.info,
  cardType: state.masterEditor.cardType,
  editStatus: state.masterEditor.editStatus,
  isSalon: isSalon(state),
  masterCardId: state.masterEditor.masterCardId,
  sectionName: 'info',
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({
      createMaster,
      getPhotos,
      removePhoto,
      setGeneralParam,
    }, dispatch),
    drawerOpen,
    routeToProfile: Actions.masterProfile,
    routeToSuccess: Actions.createMasterSuccess,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorInfo));
