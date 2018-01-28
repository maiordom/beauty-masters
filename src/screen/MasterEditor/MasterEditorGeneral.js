import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {
  createMaster,
  setGeneralParam,
  setGeneralPhone,
} from '../../actions/Master';

import MasterEditorGeneral from '../../components/MasterEditor/MasterEditorGeneral';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  ...state.masterEditor.generalSection,
  cardType: state.masterEditor.cardType,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({
      createMaster,
      setGeneralParam,
      setGeneralPhone,
    }, dispatch),
    routeToProfile: Actions.masterProfile,
    routeToServices: Actions.masterEditorService,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorGeneral));
