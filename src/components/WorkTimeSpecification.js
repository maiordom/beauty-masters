// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import difference from 'lodash/difference';

import Switch from './Switch';
import RangeTime from './RangeTime';
import PopupHeader from './PopupHeader.ios';

import vars from '../vars';
import i18n from '../i18n';

type TProps = {
  actions: Object,
  date: string,
  modelName: string,
  onRequestClose: () => void,
  sectionName: string,
  timeEndDefault: string,
  timeStartDefault: string,
  workInThisDay: boolean,
};

type TState = {
  date: string,
  dateFormatted: string,
  timeEnd: string,
  timeStart: string,
  workInThisDay: boolean,
};

export default class WorkTimeSpecification extends PureComponent<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    this.state = this.getStorage(this.props);
  }

  getStorage = (props: TProps) => ({
    timeStart: props.timeStart || props.timeStartDefault,
    timeEnd: props.timeEnd || props.timeEndDefault,
    date: props.date,
    dateFormatted: moment(props.date).format('DD MMMM YYYY, dd'),
    workInThisDay: props.workInThisDay === undefined ? true : props.workInThisDay,
  }: Object);

  onTimeStartChange = (timeStart: string) => {
    this.state.timeStart = timeStart;
  };

  onTimeEndChange = (timeEnd: string) => {
    this.state.timeEnd = timeEnd;
  };

  onApplyPress = () => {
    const {
      timeStart, timeEnd, workInThisDay, date,
    } = this.state;

    const {
      timeEndDefault,
      timeStartDefault,
      workInThisDay: workInThisDayDefault,
    } = this.props;

    const diffWithDefaultParams = difference(
      [timeStart, timeEnd, workInThisDay],
      [
        timeStartDefault,
        timeEndDefault,
        workInThisDayDefault === undefined ? true : workInThisDayDefault,
      ],
    );

    let diffWithParams = [];

    if (this.props.timeStart && this.props.timeEnd) {
      diffWithParams = difference(
        [timeStart, timeEnd],
        [this.props.timeStart, this.props.timeEnd],
      );
    }

    const changes = {
      date,
      timeStart,
      timeEnd,
      workInThisDay,
    };

    if (!diffWithDefaultParams.length && !diffWithParams.length) {
      this.props.actions.applyChanges(null);
    } else {
      this.props.actions.applyChanges(this.props.modelName, changes, this.props.sectionName);
    }

    this.props.onRequestClose();
  };

  onCancel = () => {
    this.props.onRequestClose();
  };

  onStatusChange = (workInThisDay: boolean) => {
    this.setState({
      workInThisDay,
    });
  };

  componentWillReceiveProps(nextProps: TProps) {
    this.state = this.getStorage(nextProps);
  }

  render() {
    const {
      workInThisDay, dateFormatted, timeStart, timeEnd,
    } = this.state;

    return (
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={this.onCancel}>
          <View style={styles.dismissButton} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          {Platform.select({
            android: (
              <Text style={styles.title}>{dateFormatted}</Text>
            ),
            ios: (
              <PopupHeader
                title={dateFormatted}
                hasAcceptButton
                hasCloseButton
                onAcceptButtonPress={this.onApplyPress}
                onCloseButtonPress={this.onCancel}
              />
            ),
          })}
          <Switch
            title={i18n.workInThisDay}
            value={workInThisDay}
            customStyles={{ container: styles.switch }}
            onChange={this.onStatusChange}
          />
          <RangeTime
            timeEnd={timeEnd}
            timeStart={timeStart}
            onTimeStartChange={this.onTimeStartChange}
            onTimeEndChange={this.onTimeEndChange}
          />
          {Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.button}
              onPress={this.onApplyPress}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    height: 52,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 16,
  },
  buttonText: {
    color: vars.color.red,
  },
  container: {
    backgroundColor: vars.color.white,
    ...Platform.select({
      android: {
        paddingTop: 25,
      },
    }),
  },
  dismissButton: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
    }),
  },
  switch: {
    ...Platform.select({
      android: {
        paddingLeft: 16,
        paddingRight: 14,
      },
      ios: {
        paddingLeft: 16,
      },
    }),
  },
  title: {
    paddingLeft: 16,
    fontSize: 20,
    color: vars.color.black,
  },
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
    ...Platform.select({
      android: {
        justifyContent: 'center',
        margin: 40,
      },
      ios: {
        justifyContent: 'flex-start',
      },
    }),
  },
});
