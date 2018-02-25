/* @flow */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import ButtonControl from '../ButtonControl';
import EditControl from '../EditControl';

import i18n from '../../i18n';
import vars from '../../vars';
import { trackEvent } from '../../utils/Tracker';

type TProps = {
  actions: Object,
  addressValues: Array<string>,
  cardType: string,
  isSalon: boolean,
};

export default class MasterEditorCalendar extends PureComponent<TProps, void> {
  componentDidMount() {
    if (this.props.cardType === 'edit') {
      this.props.actions.getCalendars();
    }
  }

  onNextPress = () => {
    if (this.props.cardType === 'create') {
      const createdCalendarsCount = this.props.actions.selectorGetCreatedCalendarsCount();

      if (this.props.isSalon) {
        trackEvent('step4Salon');
        trackEvent('step4SalonCalendarsCount', { labelValue: createdCalendarsCount });
      } else {
        trackEvent('step4Private');
        trackEvent('step4PrivateCalendarsCount', { labelValue: createdCalendarsCount });
      }
    }

    this.props.actions.routeToInfo();
  };

  onSavePress = () => {
    this.props.actions.routeToProfile();
  };

  onCalendarPress = (modelName: string) => {
    this.props.actions.selectCalendar({ modelName });
  };

  render() {
    const {
      addressValues,
      cardType,
    } = this.props;

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
        {cardType === 'create'
          ? <ButtonControl onPress={this.onNextPress} />
          : <EditControl
            onNextPress={this.onNextPress}
            onSavePress={this.onSavePress}
          />
        }
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
