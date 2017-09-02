/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';

import ButtonControl from '../ButtonControl';

import i18n from '../../i18n';
import vars from '../../vars';

type TProps = {
  actions: Object,
  addressValues: Array<string>,
};

export default class MasterEditorCalendar extends Component<TProps, void> {
  onNextPress = () => this.props.actions.next();
  onCalendarPress = (modelName: string) => this.props.actions.selectCalendar(modelName);

  render() {
    const { addressValues } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.selectCalendar}>
          <TouchableWithoutFeedback onPress={() => this.onCalendarPress('calendarSettingsOne')}>
            <View style={styles.openCalendar}>
              <Text style={styles.openCalendarText}>
                {addressValues[0] || i18n.addAddress[0]}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onCalendarPress('calendarSettingsTwo')}>
            <View style={styles.openCalendar}>
              <Text style={styles.openCalendarText}>
                {addressValues[1] || i18n.addAddress[1]}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onCalendarPress('calendarSettingsThree')}>
            <View style={styles.openCalendar}>
              <Text style={styles.openCalendarText}>
                {addressValues[2] || i18n.addAddress[2]}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ButtonControl onPress={this.onNextPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectCalendar: {
    flex: 1,
  },
  openCalendar: {
    height: 48,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  openCalendarText: {
    fontSize: 16,
    color: vars.color.black,
  },
});
