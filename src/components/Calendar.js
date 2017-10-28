import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import capitalize from 'lodash/capitalize';
import moment from 'moment';

import NativeCalendar from './CalendarBase';

import i18n from '../i18n';

import { prepareEventDates } from '../utils/Calendar';
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

  eventDates: [];

  constructor(props) {
    super(props);

    this.state = {
      startDate: props.startDate || null,
    };

    this.state.originStartDate = this.state.startDate;
    
    this.dayHeadings = Platform.select({
      ios: i18n.dayHeadings.map((heading) => capitalize(heading)),
      android: i18n.dayHeadings,
    });

    if (this.props.interval && this.state.startDate) {
      this.eventDates = prepareEventDates(this.props.interval.key, this.state.startDate);
    }
  }

  shouldComponentUpdate = shouldComponentUpdate();

  onDateSelect = date => {
    this.props.onDateSelect(moment(date).format(this.props.format));
  };

  getEventDates = () => this.eventDates;

  onMonthChange = date => {
    const momentDate = moment(date.format());
    let diffMonths = false;
    let startDate = this.state.originStartDate;

    if (momentDate.get('month') !== moment().get('month')) {
      startDate = momentDate.set('date', 1).format(this.props.format);
      diffMonths = true;
    }

    if (this.props.interval) {
      this.eventDates = prepareEventDates(this.props.interval.key, startDate);
    }

    this.setState({ startDate });
    this.props.onMonthChange && this.props.onMonthChange(
      diffMonths,
      this.eventDates,
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.startDate && this.props.startDate !== nextProps.startDate) {
      if (this.props.interval) {
        this.eventDates = prepareEventDates(this.props.interval.key, nextProps.startDate);
      }

      this.setState({
        startDate: nextProps.startDate,
        originStartDate: nextProps.startDate,
      });
    }
  }

  render() {
    const {
      activeFrom,
      containerWidth,
      disableSelectDate,
      events = [],
      selectedDate,
      workDays,
    } = this.props;

    const eventDates = this.eventDates;
    const eventsCalendar = events.map(event => ({
      date: event.date,
      eventIndicator: {
        backgroundColor: vars.color.blue,
      },
    }));

    return (
      <View style={styles.container}>
        <NativeCalendar
          activeFrom={activeFrom}
          dayHeadings={this.dayHeadings}
          disableSelectDate={disableSelectDate}
          eventDates={eventDates}
          events={eventsCalendar}
          monthNames={i18n.monthNames}
          nextButtonImage={icons.arrowRight}
          onDateSelect={this.onDateSelect}
          onTouchNext={this.onMonthChange}
          onTouchPrev={this.onMonthChange}
          prevButtonImage={icons.arrowLeft}
          selectedDate={selectedDate}
          showControls
          showEventIndicators
          width={containerWidth}
          workDays={workDays}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
