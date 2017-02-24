import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TimePickerAndroid,
  TouchableHighlight
} from 'react-native';

import i18n from '../i18n';
import vars from '../vars';

export default class RangeTime extends Component {
  constructor() {
    super();

    this.state = {
      timeStartHour: 10,
      timeStartMinute: 0,
      timeEndHour: 20,
      timeEndMinute: 0,
    };
  }

  formatTime = (hour, minute) => {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
  };

  onTimeStartPress = () => {
    const { timeStartHour, timeStartMinute } = this.state;

    TimePickerAndroid.open({
      hout: timeStartHour,
      minute: timeStartMinute,
      is24Hour: true,
    }).then(({action, minute, hour}) => {
      if (action === TimePickerAndroid.timeSetAction) {
        this.setState({
          timeStartHour: hour,
          timeStartMinute: minute,
        });
      }
    });
  };

  onTimeEndPress = () => {
    const { timeEndHour, timeEndMinute } = this.state;

    TimePickerAndroid.open({
      hout: timeEndHour,
      minute: timeEndMinute,
      is24Hour: true,
    }).then(({action, minute, hour}) => {
      if (action === TimePickerAndroid.timeSetAction) {
        this.setState({
          timeEndHour: hour,
          timeEndMinute: minute,
        });
      }
    });
  };

  render() {
    const {
      timeStartHour,
      timeStartMinute,
      timeEndHour,
      timeEndMinute,
    } = this.state;

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.onTimeStartPress}>
          <View style={styles.timeWrapper}>
            <Text style={styles.time}>{i18n.from}</Text>
            <Text style={styles.time}>{this.formatTime(timeStartHour, timeStartMinute)}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onTimeEndPress}>
          <View style={styles.timeWrapper}>
            <Text style={styles.time}>{i18n.to}</Text>
            <Text style={styles.time}>{this.formatTime(timeEndHour, timeEndMinute)}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 16,
    color: vars.color.black,
  },
  button: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    justifyContent: 'center',
  }
});
