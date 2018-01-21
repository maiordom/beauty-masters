import { connect } from 'react-redux';

import IntervalStartDate from '../components/IntervalStartDate';

import { setTimeTableField } from '../actions/Master';

const mapStateToProps = (state, ownProps) => ({
  onRequestClose: ownProps.onRequestClose,
  sectionName: ownProps.sectionName,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    applyDate(date, sectionName) {
      dispatch(setTimeTableField('startDateField', 'value', date, sectionName));
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(IntervalStartDate);
