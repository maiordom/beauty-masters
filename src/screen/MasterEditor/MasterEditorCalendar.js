import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import MasterEditorCalendar from '../../components/MasterEditor/MasterEditorCalendar';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state) => ({
  addressValues: [
    state.masterEditor.calendarSettingsOne.salonTitleField.value,
    state.masterEditor.calendarSettingsTwo.salonTitleField.value,
    state.masterEditor.calendarSettingsThree.salonTitleField.value,
  ],
});

const mapDispatchToProps = () => ({
  actions: {
    next: Actions.masterEditorInfo,
    selectCalendar(modelName) {
      Actions.masterEditorCalendarSetting({ modelName });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorCalendar));
