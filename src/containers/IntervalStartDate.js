import { connect } from 'react-redux';

import IntervalStartDate from '../components/IntervalStartDate';

import { setTimeTableField } from '../actions/Master';
import { drawerClose } from '../actions/Drawer';

const mapStateToProps = (state, ownProps) => ({
  sectionName: ownProps.sectionName,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    applyDate(date, sectionName) {
      dispatch(setTimeTableField('startDateField', 'value', date, sectionName));
      drawerClose();
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(IntervalStartDate);
