import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import NativeCalendar from './CalendarBase';

import i18n from '../i18n';

import { shouldComponentUpdate } from '../utils';

export default class Calendar extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  render() {
    return (
      <View style={styles.container}>
        <NativeCalendar
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
