import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

import NativeCalendar from './CalendarBase';

import i18n from '../i18n';

import { shouldComponentUpdate } from '../utils';
import vars from '../vars';

export default class Calendar extends Component {
  static defaultProps = {
    format: 'YYYY-MM-DD',
  };

  constructor(props) {
    super();

    this.state = {
      startDate: props.startDate && moment(props.startDate) || null,
    };

    this.state.originStartDate = this.state.startDate;
  }

  shouldComponentUpdate = shouldComponentUpdate();

  onDateSelect = date => {
    this.props.onDateSelect(moment(date).format(this.props.format));
  };

  onMonthChange = date => {
    const startDate = moment(date.format());

    if (startDate.get('month') !== moment().get('month')) {
      this.setState({ startDate: startDate.set('date', 1) });
    } else {
      this.setState({ startDate: moment(this.state.originStartDate) });
    }
  };

  prepareEventDates(interval, startDate) {
    let twoAfterTwo = 0;

    const todayDate = startDate.date();
    const dayInMonth = startDate.daysInMonth();
    const events = [];
    const formatDate = 'YYYY-MM-DD';

    for (let i = todayDate; i <= dayInMonth; i++) {
      let isoWeekday = startDate.isoWeekday();

      switch (interval) {
        case 'onWeekdays': {
          if ([6, 7].indexOf(isoWeekday) === -1) {
            events.push(startDate.format(formatDate));
          }
        } break;
        case 'onWeekends': {
          if ([6, 7].indexOf(isoWeekday) !== -1) {
            events.push(startDate.format(formatDate))
          }
        } break;
        case 'wholeWeek': {
          events.push(startDate.format(formatDate));
        } break;
        case 'twoAfterTwo': {
          if (twoAfterTwo < 2) {
            events.push(startDate.format(formatDate));
          }
          if (twoAfterTwo === 3) {
            twoAfterTwo = -1;
          }
          twoAfterTwo++;
        } break;
      }

      startDate = startDate.add(1, 'day');
    }

    return events;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startDate && this.props.startDate !== nextProps.startDate) {
      this.setState({
        startDate: moment(nextProps.startDate),
        originStartDate: moment(nextProps.startDate),
      });
    }
  }

  render() {
    const { interval, events = [], containerWidth, selectedDate } = this.props;
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
          dayHeadings={i18n.dayHeadings}
          eventDates={eventDates}
          events={eventsCalendar}
          monthNames={i18n.monthNames}
          nextButtonImage={require('../icons/android/arrow-right-red.png')}
          onDateSelect={this.onDateSelect}
          onTouchNext={this.onMonthChange}
          onTouchPrev={this.onMonthChange}
          prevButtonImage={require('../icons/android/arrow-left-red.png')}
          selectedDate={selectedDate}
          showControls={true}
          showEventIndicators={true}
          width={containerWidth}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
