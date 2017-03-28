import { connect } from 'react-redux';

import IntervalStartDate from '../components/IntervalStartDate';

import { setFieldParam } from '../actions/master';
import { drawerClose } from '../actions/drawer';

const mapStateToProps = (state, ownProps) => ({
  sectionName: ownProps.sectionName,
});

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      applyDate(date, sectionName) {
        dispatch(setFieldParam('recipientsField', 'startDate', date, sectionName));
        drawerClose();
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntervalStartDate);
