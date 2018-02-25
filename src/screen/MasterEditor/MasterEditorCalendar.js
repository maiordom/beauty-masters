import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterEditorCalendar from '../../components/MasterEditor/MasterEditorCalendar';
import NavBar from '../../components/NavBar';

import { getCalendars } from '../../actions/MasterEdit';

import { isSalon } from '../../utils/isSalon';

const mapStateToProps = (state) => ({
  addressValues: [
    state.masterEditor.calendarSettingsOne.salonTitleField.value,
    state.masterEditor.calendarSettingsTwo.salonTitleField.value,
    state.masterEditor.calendarSettingsThree.salonTitleField.value,
  ],
  cardType: state.masterEditor.cardType,
  isSalon: isSalon(state),
});

const selectorGetCreatedCalendarsCount = () => (dispatch, getState) => {
  const state = getState();
  let createdCalendarsCount = 0;

  [
    state.masterEditor.calendarSettingsOne,
    state.masterEditor.calendarSettingsTwo,
    state.masterEditor.calendarSettingsThree,
  ].forEach((calendar) => {
    const { schedulesCreated, timeTableId, addressId } = calendar;

    if (timeTableId && addressId && schedulesCreated) {
      createdCalendarsCount++;
    }
  });

  return createdCalendarsCount;
};

const mapDispatchToProps = (dispatch: Function) => ({
  actions: {
    ...bindActionCreators({
      getCalendars,
      selectorGetCreatedCalendarsCount,
    }, dispatch),
    routeToInfo: Actions.masterEditorInfo,
    routeToProfile: Actions.masterProfile,
    selectCalendar: Actions.masterEditorCalendarSetting,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorCalendar));
