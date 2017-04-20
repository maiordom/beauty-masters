import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCalendarField, setCalendarInterval } from '../../actions/master';
import { drawerOpen } from '../../actions/drawer';

import MasterEditorCalendarSettings from '../../components/MasterEditor/MasterEditorCalendarSettings';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state, { modelName = 'calendarSettingsOne' }) => ({
  masterSchedule: state.masterSchedule,
  calendarSettings: state.masterEditor[modelName],
  sectionName: modelName,
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({
    setCalendarField,
    setCalendarInterval,
  }, dispatch);

  return {
    onReadyPress: Actions.masterEditorCalendar,
    drawerOpen,
    actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorCalendarSettings));
