import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import moment from 'moment';
import difference from 'lodash/difference';

import { shouldComponentUpdate } from '../utils';

import Switch from '../components/Switch';
import RangeTime from '../components/RangeTime';

import vars from '../vars';
import i18n from '../i18n';

export default class WorkTimeSpecification extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  constructor(props) {
    super();

    this.state = this.getStorage(props);
  }

  getStorage = props => ({
    timeStart: props.timeStart || props.timeStartDefault,
    timeEnd: props.timeEnd || props.timeEndDefault,
    date: props.date,
    dateFormatted: moment(props.date).format('DD MMMM YYYY, dd'),
    workInThisDay: props.workInThisDay === undefined ? true : props.workInThisDay,
  });

  onTimeStartChange = timeStart => {
    this.state.timeStart = timeStart;
  };

  onTimeEndChange = timeEnd => {
    this.state.timeEnd = timeEnd;
  };

  onApplyPress = () => {
    const { timeStart, timeEnd, workInThisDay, date } = this.state;
    const { timeStartDefault, timeEndDefault, workInThisDay: workInThisDayDefault } = this.props;

    const diff = difference(
      [timeStart, timeEnd, workInThisDay],
      [timeStartDefault, timeEndDefault, workInThisDayDefault === undefined ? true : workInThisDayDefault],
    );

    if (!diff.length) {
      this.props.applyChanges(null);
      return;
    }

    const changes = {
      date,
      timeStart,
      timeEnd,
      workInThisDay,
    };

    this.props.applyChanges(this.props.modelName, changes, this.props.sectionName);
  };

  onStatusChange = workInThisDay => {
    this.state.workInThisDay = workInThisDay;
  };

  componentWillReceiveProps(nextProps) {
    this.state = this.getStorage(nextProps);
  }

  render() {
    const { workInThisDay, dateFormatted, timeStart, timeEnd } = this.state;

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
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="transparent"
            style={styles.button}
            onPress={this.onApplyPress}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
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
    marginLeft: 40,
    marginRight: 40,
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
