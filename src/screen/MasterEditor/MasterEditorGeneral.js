import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { setFieldValue } from '../../actions/master';

import MasterEditorGeneral from '../../components/MasterEditor/MasterEditorGeneral';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  ...state.masterEditor.generalSection,
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({ setFieldValue }, dispatch);

  return {
    onNextPress: Actions.masterEditorService,
    actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorGeneral));
