// @flow

import React, { PureComponent } from 'react';
import {
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
    };
  };

  componentWillReceiveProps(nextProps: TProps) {
    this.setState(this.getStorage(nextProps));
  }

  formatTime = (hour: number, minute: number) => `${hour}:${minute < 10 ? `0${minute}` : minute}`;

  onTimeStartPress = () => {
    const { timeStartHour, timeStartMinute } = this.state;

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
  };

  onTimeEndPress = () => {
    const { timeEndHour, timeEndMinute } = this.state;

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
  };

  render() {
    const {
      timeStart,
      timeEnd,
    } = this.state;

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
      ios: {
      },
    }),
  },
  timeWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...Platform.select({
      android: {
      },
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
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    justifyContent: 'center',
  },
});
