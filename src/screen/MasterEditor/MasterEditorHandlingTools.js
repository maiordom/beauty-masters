import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MasterEditorHandlingTools from '../../components/MasterEditor/MasterEditorHandlingTools';

import { toogleService, setServiceParam } from '../../actions/master';

const mapStateToProps = state => {
  return {
    ...state.masterEditor.handlingTools,
    fieldDescription: 'description',
    fieldValue: 'value',
    sectionName: 'handlingTools',
  };
};

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({ toogleService, setServiceParam }, dispatch);

  return {
    onNextPress: Actions.masterEditorCalendar,
    actions,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterEditorHandlingTools);
