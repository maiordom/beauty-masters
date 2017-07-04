// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import Calendar from '../Calendar';
import Switch from '../Switch';

import { hexToRgba } from '../../utils';

import i18n from '../../i18n';
import vars from '../../vars';

const icons = {
  ...Platform.select({
    android: {
      calendar: require('../../icons/android/calendar.png'),
    },
  }),
};

type Props = {
  salon: {
    masterSchedules: Array<{
      date: string,
      timeStart: string,
      timeEnd: string,
    }>,
    street: string,
    salonTitle: string,
    house: string,
  }
}

type State = {
  showDeactivateModal: boolean,
  isDisabled: boolean,
  selectedDate: moment
}

export default class MasterProfileCalendar extends Component<void, Props, State> {
  state = {
    showDeactivateModal: false,
    isDisabled: false,
    selectedDate: moment().add(1, 'day').format('YYYY-MM-DD'),
  };

  onSwitchToggle = () => {
    this.setState({ showDeactivateModal: !this.state.showDeactivateModal });
  };

  onDateSelect = (date: string) => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { salon } = this.props;

    const {
      showDeactivateModal,
      isDisabled,
      selectedDate,
    } = this.state;

    const selectedDay = salon.masterSchedules.find(day => day.date === selectedDate);

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>{i18n.schedule.schedule}</Text>
          <View style={styles.calendar}>
            <Calendar
              onDateSelect={this.onDateSelect}
              workDays={salon.masterSchedules.map(schedule => schedule.date)}
              selectedDate={selectedDate}
            />
          </View>
          {selectedDay
            ? (
              <View style={styles.salon}>
                <Text style={styles.salonText}>
                  {i18n.accept} {i18n.from.toLowerCase()}{' '}
                  {selectedDay.timeStart} {i18n.to.toLowerCase()} {selectedDay.timeEnd}
                </Text>
                <Text style={styles.salonText}>{i18n.salon} {salon.salonTitle}</Text>
                <Text style={styles.salonText}>{i18n.onAddress} {salon.street}, {salon.house}</Text>
              </View>
            ) : (
              <View style={styles.scheduleEmpty}>
                <Image source={icons.calendar} style={styles.calendarIcon} />
                <Text style={styles.scheduleText}>{i18n.acceptNot}</Text>
              </View>
            )}
          <Switch
            title={i18n.temporarilyDontWork}
            customStyles={{ container: styles.switchContainer }}
            onChange={this.onSwitchToggle}
            value={isDisabled}
          />
        </View>
        <Modal
          animationType={'fade'}
          transparent
          visible={showDeactivateModal}
          onRequestClose={() => {}}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{i18n.disableProfile}</Text>
              <Text style={styles.modalText}>{i18n.deactivate}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>{i18n.yes}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>{i18n.no}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: vars.color.lightGrey,
  },
  subtitle: {
    padding: 16,
  },
  calendar: {
    backgroundColor: vars.color.white,
  },
  salon: {
    padding: 16,
  },
  salonText: {
    color: vars.color.black,
  },
  calendarIcon: {
    marginRight: 16,
  },
  scheduleEmpty: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    color: vars.color.black,
  },
  switchContainer: {
    paddingLeft: 15,
    backgroundColor: vars.color.white,
    justifyContent: 'space-between',
    height: 44,
    paddingRight: 8,
    ...Platform.select({
      android: {
        height: 48,
        borderBottomColor: vars.color.borderColorAndroid,
        borderBottomWidth: 1,
        borderTopColor: vars.color.borderColorAndroid,
        borderTopWidth: 1,
      },
    }),
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: hexToRgba(vars.color.black, 40),
  },
  modalContainer: {
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: vars.color.white,
    borderRadius: 2,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    color: vars.color.black,
    marginBottom: 13,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalButtons: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  modalButton: {
    color: vars.color.red,
    fontSize: 18,
    marginLeft: 5,
  },
});