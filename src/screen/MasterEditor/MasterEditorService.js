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

const mapStateToProps = state => ({
  homeAllowanceField: state.masterEditor.services.homeAllowanceField,
  serviceManicure: state.masterEditor.serviceManicure,
  serviceManicureHasValidationErrors: state.masterEditor,
  servicePedicure: state.masterEditor.servicePedicure,
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({
    createMasterServices,
    setServiceParam,
    toggleService,
    validateServices,
  }, dispatch);

  return {
    actions: {
      ...actions,
      next: () => {
        actions.createMasterServices().then((res) => {
          if (res.result === 'success') {
            Actions.masterEditorHandlingTools();
          }
        });
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorService));
