import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import MasterEditorCalendar from '../../components/MasterEditor/MasterEditorCalendar';
import NavBar from '../../components/NavBar';

const mapDispatchToProps = dispatch => ({
  onCalendarPress(modelName) {
    Actions.masterEditorCalendarSetting({ modelName });
  },

  onNextPress() {
    Actions.masterEditorInfo();
  },
});

export default connect(null, mapDispatchToProps)(NavBar(MasterEditorCalendar));
