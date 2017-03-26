import { connect } from 'react-redux';
import find from 'lodash/find';

import { drawerClose } from '../actions/drawer';
import { setCustomDate } from '../actions/master';

import WorkTimeSpecification from '../components/WorkTimeSpecification';

const mapStateToProps = (state, ownProps) => {
  const {
    timeStartDefault,
    timeEndDefault,
    items,
  } = state.masterEditor[ownProps.sectionName].customDates;

  const dateCurrent = find(items, { date: ownProps.date }) || {};

  return {
    date: ownProps.date,
    sectionName: ownProps.sectionName,
    timeEnd: dateCurrent.timeEnd,
    timeEndDefault,
    timeStart: dateCurrent.timeStart,
    timeStartDefault,
    workInThisDay: dateCurrent.status,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    applyChanges: (changes, sectionName) => {
      drawerClose();

      if (changes) {
        dispatch(setCustomDate(changes, sectionName));
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeSpecification);
