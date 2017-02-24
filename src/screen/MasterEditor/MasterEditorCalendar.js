import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ButtonControl from '../../components/ButtonControl';

import i18n from '../../i18n';
import vars from '../../vars';

export default class MasterEditorCalendar extends Component {
  onCalendarPress = index => {
    Actions.masterEditorCalendarSetting({index: index});
  };

  onNextPress = () => {
    Actions.masterEditorAdditionalInformation();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.selectCalendar}>
          <TouchableWithoutFeedback onPress={() => this.onCalendarPress(0)}>
            <View style={styles.openCalendar}>
              <Text style={styles.openCalendarText}>{i18n.addAddress[0]}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onCalendarPress(1)}>
            <View style={styles.openCalendar}>
              <Text style={styles.openCalendarText}>{i18n.addAddress[1]}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onCalendarPress(2)}>
            <View style={styles.openCalendar}>
              <Text style={styles.openCalendarText}>{i18n.addAddress[2]}</Text>
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
