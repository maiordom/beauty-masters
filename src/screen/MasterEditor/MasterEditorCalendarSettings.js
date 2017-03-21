import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setFieldParam, setItemById } from '../../actions/master';

import MasterEditorCalendarSettings from '../../components/MasterEditor/MasterEditorCalendarSettings';

const mapStateToProps = (state, ownProps) => ({
  masterSchedule: state.masterSchedule,
  calendarSettings: state.masterEditor[ownProps.modelName],
  sectionName: ownProps.modelName,
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({
    setFieldParam,
    setItemById,
  }, dispatch);

  return {
    onReadyPress: Actions.masterEditorCalendar,
    actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterEditorCalendarSettings);
