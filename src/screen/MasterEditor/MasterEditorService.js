import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setServiceParam, toogleService, validateServices } from '../../actions/master';

import MasterEditorService from '../../components/MasterEditor/MasterEditorService';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  homeAllowanceField: state.masterEditor.services.homeAllowanceField,
  serviceManicure: state.masterEditor.serviceManicure,
  serviceManicureHasValidationErrors: state.masterEditor,
  servicePedicure: state.masterEditor.servicePedicure,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setServiceParam,
    toogleService,
    validateServices,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorService));
