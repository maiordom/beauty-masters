import { connect } from 'react-redux';
import find from 'lodash/find';

import { drawerClose } from '../actions/drawer';
import { setCalendarRecipientDate } from '../actions/master';

import WorkTimeSpecification from '../components/WorkTimeSpecification';

const mapStateToProps = (state, ownProps) => {
  const {
    items,
    modelName,
    timeEndDefault,
    timeStartDefault,
  } = state.masterEditor[ownProps.sectionName].customDates;

  const dateCurrent = find(items, { date: ownProps.date }) || {};

  return {
    date: ownProps.date,
    modelName,
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
    applyChanges: (modelName, changes, sectionName) => {
      drawerClose();

      if (changes) {
        dispatch(setCalendarRecipientDate(modelName, changes, sectionName));
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeSpecification);
