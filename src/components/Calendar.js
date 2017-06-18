import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

import NativeCalendar from './CalendarBase';

import i18n from '../i18n';

import { shouldComponentUpdate } from '../utils';
import vars from '../vars';

const icons = {
  arrowRight: require('../icons/android/arrow-right-red.png'),
  arrowLeft: require('../icons/android/arrow-left-red.png'),
};

export default class Calendar extends Component {
  static defaultProps = {
    format: 'YYYY-MM-DD',
    workDays: [],
  };

  static propTypes = {
    activeFrom: PropTypes.instanceOf(moment),
  };

  constructor(props) {
    super();

    this.state = {
      startDate: props.startDate || null,
    };

    this.state.originStartDate = this.state.startDate;
  }

  shouldComponentUpdate = shouldComponentUpdate();

  onDateSelect = date => {
    this.props.onDateSelect(moment(date).format(this.props.format));
  };

  onMonthChange = date => {
    const momentDate = moment(date.format());

    if (momentDate.get('month') !== moment().get('month')) {
      this.setState({ startDate: momentDate.set('date', 1).format(this.props.format) });
    } else {
      this.setState({ startDate: this.state.originStartDate });
    }
  };

  prepareEventDates(interval, startDate) {
    let momentStartDate = moment(startDate);
    let twoAfterTwo = 0;

    const todayDate = momentStartDate.date();
    const dayInMonth = momentStartDate.daysInMonth();
    const events = [];
    const formatDate = 'YYYY-MM-DD';

    for (let i = todayDate; i <= dayInMonth; i++) {
      const isoWeekday = momentStartDate.isoWeekday();

      switch (interval) {
        case 'onWeekdays': {
          if ([6, 7].indexOf(isoWeekday) === -1) {
            events.push(momentStartDate.format(formatDate));
          }
        } break;
        case 'onWeekends': {
          if ([6, 7].indexOf(isoWeekday) !== -1) {
            events.push(momentStartDate.format(formatDate));
          }
        } break;
        case 'wholeWeek': {
          events.push(momentStartDate.format(formatDate));
        } break;
        case 'twoAfterTwo': {
          if (twoAfterTwo < 2) {
            events.push(momentStartDate.format(formatDate));
          }
          if (twoAfterTwo === 3) {
            twoAfterTwo = -1;
          }
          twoAfterTwo++;
        } break;
      }

      momentStartDate = momentStartDate.add(1, 'day');
    }

    return events;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startDate && this.props.startDate !== nextProps.startDate) {
      this.setState({
        startDate: nextProps.startDate,
        originStartDate: nextProps.startDate,
      });
    }
  }

  render() {
    const {
      containerWidth,
      disableSelectDate,
      events = [],
      interval,
      selectedDate,
      activeFrom,
      workDays,
    } = this.props;

    const { startDate } = this.state;

    let eventDates = [];

    const eventsCalendar = events.map(event => ({
      date: event.date,
      eventIndicator: {
        backgroundColor: vars.color.blue,
      },
    }));

    if (interval && startDate) {
      eventDates = this.prepareEventDates(interval.key, startDate);
    }

    return (
      <View style={styles.container}>
        <NativeCalendar
          disableSelectDate={disableSelectDate}
          activeFrom={activeFrom}
          dayHeadings={i18n.dayHeadings}
          eventDates={eventDates}
          events={eventsCalendar}
          monthNames={i18n.monthNames}
          nextButtonImage={icons.arrowRight}
          onDateSelect={this.onDateSelect}
          onTouchNext={this.onMonthChange}
          onTouchPrev={this.onMonthChange}
          prevButtonImage={icons.arrowLeft}
          selectedDate={selectedDate}
          workDays={workDays}
          showControls
          showEventIndicators
          width={containerWidth}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
