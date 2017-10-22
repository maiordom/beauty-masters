import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import MasterEditorCalendar from '../../components/MasterEditor/MasterEditorCalendar';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state) => ({
  cardType: state.masterEditor.cardType,
  addressValues: [
    state.masterEditor.calendarSettingsOne.salonTitleField.value,
    state.masterEditor.calendarSettingsTwo.salonTitleField.value,
    state.masterEditor.calendarSettingsThree.salonTitleField.value,
  ],
});

const mapDispatchToProps = () => ({
  actions: {
    routeToInfo: Actions.masterEditorInfo,
    routeToProfile: Actions.pop,
    selectCalendar: Actions.masterEditorCalendarSetting,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorCalendar));
