import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MasterEditorHandlingTools from '../../components/MasterEditor/MasterEditorHandlingTools';
import NavBar from '../../components/NavBar';

import { toggleService, setServiceParam } from '../../actions/master';

const mapStateToProps = state => ({
  ...state.masterEditor.handlingTools,
  fieldDescription: 'description',
  fieldValue: 'value',
  sectionName: 'handlingTools',
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({ toggleService, setServiceParam }, dispatch);

  return {
    onNextPress: Actions.masterEditorCalendar,
    actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorHandlingTools));
