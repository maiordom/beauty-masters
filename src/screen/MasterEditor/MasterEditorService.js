import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import {
  createMasterServices,
  setServiceParam,
  toggleService,
  validateServices,
} from '../../actions/Master';

import MasterEditorService from '../../components/MasterEditor/MasterEditorService';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state) => ({
  cardType: state.masterEditor.cardType,
  homeAllowanceField: state.masterEditor.services.homeAllowanceField,
  serviceManicure: state.masterEditor.serviceManicure,
  servicePedicure: state.masterEditor.servicePedicure,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators({
      createMasterServices,
      setServiceParam,
      toggleService,
      validateServices,
    }, dispatch),
    routeToHandlingTools: Actions.masterEditorHandlingTools,
    routeToProfile: Actions.pop,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorService));
