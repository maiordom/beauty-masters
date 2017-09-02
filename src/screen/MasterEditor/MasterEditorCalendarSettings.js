import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createAddress,
  setAddressField,
  setCalendarField,
  setCalendarInterval,
} from '../../actions/master';
import { drawerOpen } from '../../actions/drawer';

import MasterEditorCalendarSettings from '../../components/MasterEditor/MasterEditorCalendarSettings';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state, { modelName = 'calendarSettingsOne' }) => ({
  calendarSettings: state.masterEditor[modelName],
  masterSchedule: state.masterSchedule,
  sectionName: modelName,
});

const mapDispatchToProps = (dispatch, { modelName = 'calendarSettingsOne' }) => {
  const actions = bindActionCreators({
    createAddress,
    setAddressField,
    setCalendarField,
    setCalendarInterval,
  }, dispatch);

  return {
    actions: {
      ...actions,
      drawerOpen,
      next() {
        actions.createAddress(modelName).then((res) => {
          if (!res.error) {
            Actions.masterEditorCalendar();
          }
        });
      },
      selectAddress(modelName) {
        Actions.calendarAddressAutocomplete({ modelName });
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorCalendarSettings));
