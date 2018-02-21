// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import difference from 'lodash/difference';

import Switch from '../components/Switch';
import RangeTime from '../components/RangeTime';

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
    const { timeStart, timeEnd, workInThisDay, date } = this.state;

    const {
      timeEndDefault,
      timeStartDefault,
      workInThisDay: workInThisDayDefault
    } = this.props;

    const diffWithDefaultParams = difference(
      [timeStart, timeEnd, workInThisDay],
      [
        timeStartDefault,
        timeEndDefault,
        workInThisDayDefault === undefined ? true : workInThisDayDefault,
      ],
    );

    const diffWithParams = difference(
      [timeStart, timeEnd],
      [this.props.timeStart, this.props.timeEnd]
    );

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

  onStatusChange = (workInThisDay: boolean) => {
    this.state.workInThisDay = workInThisDay;
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
        <View style={styles.container}>
          <Text style={styles.title}>{dateFormatted}</Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={this.onApplyPress}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    margin: 40,
  },
  switch: {
    paddingLeft: 16,
    paddingRight: 14,
  },
  title: {
    paddingLeft: 16,
    fontSize: 20,
    color: vars.color.black,
  },
  container: {
    paddingTop: 25,
    backgroundColor: vars.color.white,
  },
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
});
