import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import {
  createMasterServices,
  setServiceParam,
  toggleService,
  validateServices,
} from '../../actions/Master';

import { getServices } from '../../actions/MasterEdit';

import MasterEditorService from '../../components/MasterEditor/MasterEditorService';
import NavBar from '../../components/NavBar';

import { isSalon } from '../../utils/isSalon';

const mapStateToProps = (state) => ({
  cardType: state.masterEditor.cardType,
  isSalon: isSalon(state),
  homeAllowanceField: state.masterEditor.services.homeAllowanceField,
  serviceManicure: state.masterEditor.serviceManicure,
  servicePedicure: state.masterEditor.servicePedicure,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators({
      createMasterServices,
      getServices,
      setServiceParam,
      toggleService,
      validateServices,
    }, dispatch),
    routeToHandlingTools: Actions.masterEditorHandlingTools,
    routeToProfile: Actions.masterProfile,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorService));
