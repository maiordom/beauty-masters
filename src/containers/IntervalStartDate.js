import { connect } from 'react-redux';

import IntervalStartDate from '../components/IntervalStartDate';

import { setCalendarField } from '../actions/master';
import { drawerClose } from '../actions/drawer';

const mapStateToProps = (state, ownProps) => ({
  sectionName: ownProps.sectionName,
});

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      applyDate(date, sectionName) {
        dispatch(setCalendarField('startDateField', 'value', date, sectionName));
        drawerClose();
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntervalStartDate);
