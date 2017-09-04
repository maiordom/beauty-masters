import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createSchedules,
  handleAddress,
  handleTimeTable,
  setAddressField,
  setCalendarInterval,
  setTimeTableField,
} from '../../actions/master';
import { drawerOpen } from '../../actions/drawer';

import MasterEditorCalendarSettings from '../../components/MasterEditor/MasterEditorCalendarSettings';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state, { modelName = 'calendarSettingsOne' }) => ({
  calendarSettings: state.masterEditor[modelName],
  sectionName: modelName,
});

const mapDispatchToProps = (dispatch, { modelName = 'calendarSettingsOne' }) => {
  const actions = bindActionCreators({
    createSchedules,
    handleAddress,
    handleTimeTable,
    setAddressField,
    setCalendarInterval,
    setTimeTableField,
  }, dispatch);

  return {
    actions: {
      ...actions,
      drawerOpen,
      next() {
        return actions.handleAddress(modelName)
          .then(() => actions.handleTimeTable(modelName))
          .then(() => actions.createSchedules(modelName))
          .then(Actions.masterEditorCalendar)
          .catch(Actions.masterEditorCalendar);
      },
      selectAddress(modelName) {
        Actions.calendarAddressAutocomplete({ modelName });
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorCalendarSettings));
