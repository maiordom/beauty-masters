import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { removePhoto, createMaster, setGeneralParam } from '../../actions/Master';
import { getMasterInfo } from '../../actions/MasterEdit';

import MasterEditorInfo from '../../components/MasterEditor/MasterEditorInfo';
import NavBar from '../../components/NavBar';

import { isSalon } from '../../utils/isSalon';

const mapStateToProps = (state) => ({
  ...state.masterEditor.info,
  cardType: state.masterEditor.cardType,
  editStatus: state.masterEditor.editStatus,
  isSalon: isSalon(state),
  masterCardId: state.masterEditor.masterCardId,
  sectionName: 'info',
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators({
      createMaster,
      getMasterInfo,
      removePhoto,
      setGeneralParam,
    }, dispatch),
    routeToProfile: Actions.masterProfile,
    routeToSuccess: Actions.createMasterSuccess,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorInfo));
