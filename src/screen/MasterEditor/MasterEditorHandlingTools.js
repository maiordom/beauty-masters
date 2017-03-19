import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MasterEditorHandlingTools from '../../components/MasterEditor/MasterEditorHandlingTools';

import { setFieldParam } from '../../actions/master';

const mapStateToProps = state => {
  return {
    ...state.masterEditor.handlingTools,
    sectionName: 'handlingTools',
    fieldActive: 'active',
    fieldValue: 'value',
  };
};

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({ setFieldParam }, dispatch);

  return {
    onNextPress: Actions.masterEditorCalendar,
    actions,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterEditorHandlingTools);
