import { connect } from 'react-redux';
import find from 'lodash/find';

import { drawerClose } from '../actions/Drawer';
import { setCalendarSchedule } from '../actions/Master';

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
    workInThisDay: (() => {
      if (dateCurrent && typeof dateCurrent.workInThisDay === 'boolean') {
        return dateCurrent.workInThisDay;
      }

      return ownProps.hasEvent;
    })(),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    applyChanges: (modelName, changes, sectionName) => {
      drawerClose();

      if (changes) {
        dispatch(setCalendarSchedule(modelName, changes, sectionName));
      }
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeSpecification);
