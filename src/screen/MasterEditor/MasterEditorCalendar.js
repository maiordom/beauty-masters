import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import MasterEditorCalendar from '../../components/MasterEditor/MasterEditorCalendar';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state) => ({
  addressValues: [
    state.masterEditor.calendarSettingsOne.salonTitleField.value,
    state.masterEditor.calendarSettingsTwo.salonTitleField.value,
    state.masterEditor.calendarSettingsThree.salonTitleField.value,
  ]
});

const mapDispatchToProps = dispatch => ({
  onCalendarPress(modelName) {
    Actions.masterEditorCalendarSetting({ modelName });
  },

  onNextPress() {
    Actions.masterEditorInfo();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorCalendar));
