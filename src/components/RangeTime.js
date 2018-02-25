// @flow

import React, { PureComponent } from 'react';
import {
  DatePickerIOS,
  View,
  Text,
  Platform,
  StyleSheet,
  TimePickerAndroid,
  TouchableHighlight,
} from 'react-native';

import i18n from '../i18n';
import vars from '../vars';
import Separator from './Separator.ios';

type TProps = {
  onTimeEndChange: (timeEnd: string, modelName: string) => void,
  onTimeStartChange: (timeStart: string, modelName: string) => void,
  timeEnd: string,
  timeStart: string,
  timeStartModelName: string,
  timeEndModelName: string,
};

type TState = {
  timeStart: string,
  timeEnd: string,
  timeStartHour: number,
  timeStartMinute: number,
  timeEndHour: number,
  timeEndMinute: number,
  showTimeStartPicker: boolean,
  showTimeEndPicker: boolean,
};

// $FlowFixMe
export default class RangeTime extends PureComponent<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    this.state = this.getStorage(this.props);
  }

  getStorage = (props: TProps) => {
    const { timeStart, timeEnd } = props;
    const [timeStartHour, timeStartMinute] = timeStart.split(':');
    const [timeEndHour, timeEndMinute] = timeEnd.split(':');

    return {
      timeStart,
      timeEnd,
      timeStartHour: Number(timeStartHour),
      timeStartMinute: Number(timeStartMinute),
      timeEndHour: Number(timeEndHour),
      timeEndMinute: Number(timeEndMinute),
      showTimeStartPicker: this.state != null ? this.state.showTimeStartPicker : false,
      showTimeEndPicker: this.state != null ? this.state.showTimeEndPicker : false,
    };
  };

  componentWillReceiveProps(nextProps: TProps) {
    this.setState(this.getStorage(nextProps));
  }

  formatTime = (hour: number, minute: number) => `${hour}:${minute < 10 ? `0${minute}` : minute}`;

  onTimeStartPress = () => {
    const { timeStartHour, timeStartMinute } = this.state;

    if (Platform.OS === 'android') {
      TimePickerAndroid.open({
        hour: timeStartHour,
        minute: timeStartMinute,
        is24Hour: true,
      }).then(({ action, minute, hour }) => {
        if (action === TimePickerAndroid.timeSetAction) {
          const timeStart = this.formatTime(hour, minute);

          this.setState({
            timeStartHour: hour,
            timeStartMinute: minute,
            timeStart,
          });

          this.props.onTimeStartChange(timeStart, this.props.timeStartModelName);
        }
      });
    } else {
      this.setState({
        showTimeStartPicker: !this.state.showTimeStartPicker,
        showTimeEndPicker: false,
      });
    }
  };

  onTimeEndPress = () => {
    const { timeEndHour, timeEndMinute } = this.state;

    if (Platform.OS === 'android') {
      TimePickerAndroid.open({
        hour: timeEndHour,
        minute: timeEndMinute,
        is24Hour: true,
      }).then(({ action, minute, hour }) => {
        if (action === TimePickerAndroid.timeSetAction) {
          const timeEnd = this.formatTime(hour, minute);

          this.setState({
            timeEndHour: hour,
            timeEndMinute: minute,
            timeEnd,
          });

          this.props.onTimeEndChange(timeEnd, this.props.timeEndModelName);
        }
      });
    } else {
      this.setState({
        showTimeStartPicker: false,
        showTimeEndPicker: !this.state.showTimeEndPicker,
      });
    }
  };

  onStartTimeChange = (startDate: Date) => {
    const hour = startDate.getHours();
    const minute = startDate.getMinutes();
    const timeStart = this.formatTime(hour, minute);

    this.setState({
      timeStartHour: hour,
      timeStartMinute: minute,
      timeStart,
    });

    this.props.onTimeStartChange(timeStart, this.props.timeStartModelName);
  };

  onEndTimeChange = (endDate: Date) => {
    const hour = endDate.getHours();
    const minute = endDate.getMinutes();
    const timeEnd = this.formatTime(hour, minute);

    this.setState({
      timeEndHour: hour,
      timeEndMinute: minute,
      timeEnd,
    });

    this.props.onTimeEndChange(timeEnd, this.props.timeEndModelName);
  };

  render() {
    const {
      timeStart,
      timeStartHour,
      timeStartMinute,
      timeEnd,
      timeEndHour,
      timeEndMinute,
      showTimeStartPicker,
      showTimeEndPicker,
    } = this.state;

    const getDateWithTime = (hours: number, minutes: number) => {
      const date = new Date();
      date.setHours(hours, minutes);
      return date;
    };

    return (
      <View style={styles.container}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          style={styles.button}
          onPress={this.onTimeStartPress}
        >
          <View style={styles.timeWrapper}>
            <Text style={styles.timeTitle}>{i18n.from}</Text>
            <Text style={styles.timeValue}>{timeStart}</Text>
          </View>
        </TouchableHighlight>
        {Platform.OS === 'ios' && <Separator />}
        {showTimeStartPicker &&
          <View>
            <DatePickerIOS
              mode="time"
              minuteInterval={1}
              date={getDateWithTime(timeStartHour, timeStartMinute)}
              onDateChange={this.onStartTimeChange}
            />
            <Separator />
          </View>
        }
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          style={styles.button}
          onPress={this.onTimeEndPress}
        >
          <View style={styles.timeWrapper}>
            <Text style={styles.timeTitle}>{i18n.to}</Text>
            <Text style={styles.timeValue}>{timeEnd}</Text>
          </View>
        </TouchableHighlight>
        {showTimeEndPicker &&
          <View>
            <Separator />
            <DatePickerIOS
              mode="time"
              minuteInterval={1}
              date={getDateWithTime(timeEndHour, timeEndMinute)}
              onDateChange={this.onEndTimeChange}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        height: 48,
        flexDirection: 'row',
      },
    }),
  },
  timeWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        height: 44,
        alignItems: 'center',
      },
    }),
  },
  timeTitle: {
    ...Platform.select({
      android: {
        fontSize: 16,
        color: vars.color.black,
      },
      ios: {
        fontSize: 17,
        color: vars.color.grey,
      },
    }),
  },
  timeValue: {
    ...Platform.select({
      android: {
        fontSize: 16,
        color: vars.color.black,
      },
      ios: {
        fontSize: 17,
        color: vars.color.black,
      },
    }),
  },
  button: {
    ...Platform.select({
      android: {
        flex: 1,
      },
    }),
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
