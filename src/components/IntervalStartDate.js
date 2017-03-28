import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';

import Calendar from './Calendar';

import i18n from '../i18n';
import vars from '../vars';

export default class IntervalStartDate extends Component {
  state = {};

  onApplyPress = () => {
    this.props.actions.applyDate(this.state.selectedDate, this.props.sectionName);
  };

  onDateSelect = selectedDate => {
    this.setState({ selectedDate });
  };

  render() {
    const containerWidth = Dimensions.get('window').width - 16 * 2;
    const { selectedDate } = this.state;

    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>{i18n.startWorkOnThisSchedule}</Text>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={this.onDateSelect}
            containerWidth={containerWidth}
          />
          <TouchableHighlight onPress={this.onApplyPress} style={styles.button}>
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
  container: {
    backgroundColor: vars.color.white,
    marginLeft: 16,
    marginRight: 16,
  },
  title: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 4,
    fontSize: 20,
    color: vars.color.black,
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