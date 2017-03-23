import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

import NativeCalendar from './CalendarBase';

import i18n from '../i18n';

import { shouldComponentUpdate } from '../utils';

export default class Calendar extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  prepareEventsByInterval(interval) {
    let todayMoment = moment();
    let twoAfterTwo = 0;

    const todayDate = todayMoment.date();
    const dayInMonth = todayMoment.daysInMonth();
    const events = [];
    const formatDate = 'YYYY-MM-DD';

    for (let i = todayDate; i <= dayInMonth; i++) {
      let isoWeekday = todayMoment.isoWeekday();

      switch (interval) {
        case 'onWeekdays': {
          if ([6, 7].indexOf(isoWeekday) === -1) {
            events.push(todayMoment.format(formatDate));
          }
        } break;
        case 'onWeekends': {
          if ([6, 7].indexOf(isoWeekday) !== -1) {
            events.push(todayMoment.format(formatDate))
          }
        } break;
        case 'wholeWeek': {
          events.push(todayMoment.format(formatDate));
        } break;
        case 'twoAfterTwo': {
          if (twoAfterTwo < 2) {
            events.push(todayMoment.format(formatDate));
          }
          if (twoAfterTwo === 3) {
            twoAfterTwo = -1;
          }
          twoAfterTwo++;
        } break;
      }

      todayMoment = todayMoment.add(1, 'day');
    }

    return events;
  }

  render() {
    const {interval} = this.props;
    let events = [];

    if (interval) {
      events = this.prepareEventsByInterval(interval.key)
    }

    return (
      <View style={styles.container}>
        <NativeCalendar
          eventDates={events}
          showEventIndicators={true}
          dayHeadings={i18n.dayHeadings}
          showControls={true}
          monthNames={i18n.monthNames}
          prevButtonImage={require('../icons/android/arrow-left-red.png')}
          nextButtonImage={require('../icons/android/arrow-right-red.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
