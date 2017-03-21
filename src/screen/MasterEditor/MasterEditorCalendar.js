import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import MasterEditorCalendar from '../../components/MasterEditor/MasterEditorCalendar';

const mapDispatchToProps = dispatch => ({
  onCalendarPress(modelName) {
    Actions.masterEditorCalendarSetting({modelName: modelName});
  },

  onNextPress() {
    Actions.masterEditorInfo();
  },
});

export default connect(null, mapDispatchToProps)(MasterEditorCalendar);
