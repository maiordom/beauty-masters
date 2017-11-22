// @flow

import React, { Component } from 'react';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import find from 'lodash/find';

import Calendar from '../Calendar';
import Switch from '../Switch';

import { hexToRgba } from '../../utils';
import { prepareEventDates } from '../../utils/Calendar';

import i18n from '../../i18n';
import vars from '../../vars';

const icons = {
  ...Platform.select({
    android: {
      calendar: require('../../icons/android/calendar.png'),
    },
  }),
};

type TSchedule = {
  date: string,
  isNotWork: number,
  timeEnd: string,
  timeStart: string,
};

type TProps = {
  schedules: Array<TSchedule>,
  timeTable: {
    dateStart: string,
    intervalKey: string,
    timeEnd: string,
    timeStart: string,
  },
  address: string,
  name: string,
}

type TState = {
  diffMonths: boolean;
  disableCalendar: boolean,
  selectedDate: string,
  selectedDay?: null | {
    timeStart: string,
    timeEnd: string,
  },
  schedules?: Array<TSchedule>,
  showDeactivateModal: boolean,
  today: string,
}

export default class MasterProfileCalendar extends Component<TProps, TState> {
  eventDates = [];

  constructor(props: TProps) {
    super(props);

    this.state = {
      diffMonths: false,
      disableCalendar: false,
      selectedDate: moment().format('YYYY-MM-DD'),
      showDeactivateModal: false,
      today: moment().format('YYYY-MM-DD'),
    };

    this.state.schedules = this.props.schedules.filter(item => !item.isNotWork);

    if (props.timeTable) {
      this.eventDates = prepareEventDates(
        props.timeTable.intervalKey,
        props.timeTable.dateStart,
      );

      const selectedDay = this.getSelectedDay(this.state.selectedDate);

      if (selectedDay) {
        this.state.selectedDay = selectedDay;
      }
    }
  }

  onSwitchToggle = () => {
    if (this.state.disableCalendar) {
      this.setState({ disableCalendar: false });
    } else {
      this.setState({ showDeactivateModal: !this.state.showDeactivateModal });
    }
  };

  getSelectedDay = (date: string) => {
    const selectedDate = find(this.state.schedules, { date });

    if (selectedDate && !selectedDate.isNotWork) {
      return {
        timeStart: selectedDate.timeStart,
        timeEnd: selectedDate.timeEnd,
      };
    }

    const hasSelectedDate = this.eventDates.includes(date);

    if (hasSelectedDate) {
      return {
        timeStart: this.props.timeTable.timeStart,
        timeEnd: this.props.timeTable.timeEnd,
      };
    }
  }

  onDateSelect = (date: string) => {
    const selectedDay = this.getSelectedDay(date);

    this.setState({ selectedDate: date, selectedDay });
  };

  onMonthChange = (diffMonths: boolean, eventDates: Array<any>) => {
    this.eventDates = eventDates;

    const selectedDate = diffMonths
      ? this.state.selectedDate
      : this.state.today;

    const selectedDay = this.getSelectedDay(selectedDate);

    this.setState({ diffMonths, selectedDay, selectedDate });
  };

  onAcceptDeactivateAddress = () => {
    this.setState({
      showDeactivateModal: !this.state.showDeactivateModal,
      disableCalendar: true,
    });
  }

  onDeclineDeactiveAddress = () => {
    this.setState({
      showDeactivateModal: !this.state.showDeactivateModal,
      disableCalendar: false,
    });
  };

  render() {
    const { address, name } = this.props;
    const { intervalKey, dateStart } = this.props.timeTable;

    const {
      diffMonths,
      disableCalendar,
      schedules,
      selectedDate,
      selectedDay,
      showDeactivateModal,
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.inner}>
          <View style={styles.content}>
            <Text style={styles.subtitle}>{i18n.schedule.schedule}</Text>
            <View style={styles.calendar}>
              <Calendar
                events={schedules}
                interval={{ key: intervalKey }}
                onDateSelect={this.onDateSelect}
                onMonthChange={this.onMonthChange}
                selectedDate={selectedDate}
                startDate={dateStart}
              />
            </View>
            {selectedDay
              ? (
                <View style={styles.salon}>
                  <Text style={styles.salonText}>
                    {i18n.accept} {i18n.from.toLowerCase()}{' '}
                    {selectedDay.timeStart} {i18n.to.toLowerCase()} {selectedDay.timeEnd}
                  </Text>
                  <Text style={styles.salonText}>{i18n.name} {name}</Text>
                  <Text style={styles.salonText}>{i18n.onAddress} {address}</Text>
                </View>
              )
              : diffMonths
                ? null
                : (
                  <View style={styles.scheduleEmpty}>
                    <Image source={icons.calendar} style={styles.calendarIcon} />
                    <Text style={styles.scheduleText}>{i18n.acceptNot}</Text>
                  </View>
                )}
            <Switch
              title={i18n.temporarilyDontWork}
              customStyles={{ container: styles.switchContainer }}
              onChange={this.onSwitchToggle}
              value={disableCalendar}
            />
          </View>
        </ScrollView>
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
                <TouchableOpacity onPress={this.onAcceptDeactivateAddress}>
                  <Text style={styles.modalButton}>{i18n.yes}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onDeclineDeactiveAddress}>
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
  },
  inner: {
    flex: 1,
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
    fontSize: 16,
    marginTop: 10,
    marginRight: 15,
  },
});
