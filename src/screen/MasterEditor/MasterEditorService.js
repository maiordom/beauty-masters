import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setServiceParam, toogleService } from '../../actions/master';

import MasterEditorService from '../../components/MasterEditor/MasterEditorService';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  serviceManicure: state.masterEditor.serviceManicure,
  servicePedicure: state.masterEditor.servicePedicure,
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({
    setServiceParam,
    toogleService,
  }, dispatch);

  return {
    actions,
    onNextPress() {
      Actions.masterEditorHandlingTools();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorService));
