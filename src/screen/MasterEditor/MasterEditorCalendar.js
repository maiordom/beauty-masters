import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterEditorCalendar from '../../components/MasterEditor/MasterEditorCalendar';
import NavBar from '../../components/NavBar';

import { getCalendars } from '../../actions/MasterEdit';

const mapStateToProps = (state) => ({
  cardType: state.masterEditor.cardType,
  addressValues: [
    state.masterEditor.calendarSettingsOne.salonTitleField.value,
    state.masterEditor.calendarSettingsTwo.salonTitleField.value,
    state.masterEditor.calendarSettingsThree.salonTitleField.value,
  ],
});

const mapDispatchToProps = (dispatch: Function) => ({
  actions: {
    ...bindActionCreators({ getCalendars }, dispatch),
    routeToInfo: Actions.masterEditorInfo,
    routeToProfile: Actions.masterProfile,
    selectCalendar: Actions.masterEditorCalendarSetting,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorCalendar));
