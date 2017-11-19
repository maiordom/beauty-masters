// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import Calendar from '../Calendar';
import { prepareEventDates } from '../../utils/Calendar';

import i18n from '../../i18n';
import vars from '../../vars';

const icons = {
  location: require('../../icons/location-small.png'),
  map: require('../../icons/map.png'),
  ...Platform.select({
    android: {
      calendar: require('../../icons/android/calendar.png'),
    },
    ios: {
      calendar: require('../../icons/ios/calendar-none.png'),
    },
  }),
};

type Address = {
  id: number,
  location: {
    lat: string,
    lng: string,
  },
  name: string,
};

type TProps = {
  addresses: Array<Address>,
  isSalon: boolean,
  masterPhoto: string,
  salonName: string,
  scrollToEnd: Function,
  username: string,
};

type TState = {
  addresses: any,
  selectedAddressIndex: number,
  selectedDate: string,
};

export default class MasterCardShedule extends Component<TProps, TState> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      addresses: ds.cloneWithRows(props.addresses),
      scheduleShow: true,
      selectedAddressIndex: 0,
      selectedDate: moment().format('YYYY-MM-DD'),
      today: moment().format('YYYY-MM-DD'),
    };
  }

  onDateSelect = (date: string) => {
    this.setState({ selectedDate: date, scheduleShow: true });
    InteractionManager.runAfterInteractions(() => {
      this.props.scrollToEnd();
    });
  };

  onMonthChange = (diffMonths: boolean, eventDates: Array<any>) => {
    this.eventDates = eventDates;
    this.setState({ scheduleShow: false });
  };

  onMapPress = () => {
    const {
      address,
      location,
    } = this.getSelectedAddress();

    Actions.masterLocation({
      address,
      isSalon: this.props.isSalon,
      location,
      photo: this.props.masterPhoto,
      username: this.props.username,
    });
  };

  getSelectedAddress = (index: ?number): Address => {
    const { selectedAddressIndex } = this.state;
    const { addresses } = this.props;

    return addresses[index || selectedAddressIndex];
  };

  getDateStart() {
    const address = this.getSelectedAddress();

    let startDate = address.timeTable.dateStart;
    const startDateMoment = moment(startDate);
    const { intervalKey } = address.timeTable;

    if (startDateMoment.get('month') !== moment().get('month')) {
      startDate = moment().set('date', 1).format('YYYY-MM-DD');
    }

    return startDate;
  }

  getSelectedDay = (date: string) => {
    const address = this.getSelectedAddress();

    if (!this.eventDates) {
      this.eventDates = prepareEventDates(
        address.timeTable.intervalKey,
        this.getDateStart(),
      );
    }

    const hasSelectedDate = this.eventDates.includes(date);

    if (hasSelectedDate) {
      return {
        timeStart: address.timeTable.timeStart,
        timeEnd: address.timeTable.timeEnd,
      };
    }
  }

  onAddressesSwipe = (event: any) => {
    const clientWidth = Dimensions.get('window').width;
    const xOffset = event.nativeEvent.contentOffset.x;
    const selectedAddressIndex = Math.round(xOffset / clientWidth);

    if (this.state.selectedAddressIndex !== selectedAddressIndex) {
      this.setState({ selectedAddressIndex });
    }
  };

  renderAddress = (index: number) => {
    const {
      address,
      subwayStation,
    } = this.getSelectedAddress(index);

    return (
      <View style={styles.address}>
        <View>
          <Text style={styles.addressTitle}>
            {address}
          </Text>
          <View style={styles.metro}>
            <Image source={icons.location} style={styles.location} />
            <Text style={styles.metroTitle}>{i18n.metroShort}. {subwayStation}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.onMapPress}>
          <Image source={icons.map} style={styles.map} />
        </TouchableOpacity>
      </View>
    );
  };

  renderAddresses = () => (
    <View style={styles.addressWrapper}>
      <ListView
        dataSource={this.state.addresses}
        horizontal
        onScroll={this.onAddressesSwipe}
        pagingEnabled
        renderRow={(rowData, _, index) => this.renderAddress(index)}
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.dots}>
        {this.props.addresses.map((address, index) => (
          <View
            key={address.id}
            style={[styles.dot, this.state.selectedAddressIndex === index ? styles.dotActive : {}]}
          />
        ))}
      </View>
    </View>
  );

  renderCalendar = () => {
    const address = this.getSelectedAddress();
    const { intervalKey } = address.timeTable;

    return (
      <View style={styles.calendar}>
        <Text style={styles.calendarTitle}>{i18n.schedule.schedule}</Text>
        <Calendar
          interval={{ key: intervalKey }}
          key={address.id}
          onDateSelect={this.onDateSelect}
          onMonthChange={this.onMonthChange}
          selectedDate={this.state.selectedDate}
          startDate={this.getDateStart()}
        />
      </View>
    );
  };

  getScheduleTitle = (schedule) => [
    i18n.accept,
    i18n.from.toLowerCase(),
    schedule.timeStart,
    i18n.to.toLowerCase(),
    schedule.timeEnd,
  ].join(' ');

  renderSchedule = () => {
    const { address } = this.getSelectedAddress();
    const { isSalon, salonName } = this.props;
    const { selectedDate, scheduleShow } = this.state;
    const schedule = this.getSelectedDay(selectedDate);

    return (
      <View style={styles.scheduleWrapper}>
        {schedule
          ? (
            <View style={styles.schedule}>
              <View style={styles.scheduleTextWrapper}>
                <Text style={styles.scheduleText}>{this.getScheduleTitle(schedule)}</Text>
                {isSalon && (
                  <Text style={styles.scheduleText}>{i18n.salon} «{salonName}»</Text>
                )}
                <Text style={styles.scheduleText}>{i18n.onAddress} {address}</Text>
              </View>
              <TouchableOpacity onPress={this.onMapPress} style={styles.mapButton}>
                <Image source={icons.map} style={styles.map} />
              </TouchableOpacity>
            </View>
          )
          : scheduleShow
            ? (
              <View style={styles.scheduleEmpty}>
                <Image source={icons.calendar} style={styles.calendarIcon} />
                <Text style={styles.scheduleText}>{i18n.acceptNot}</Text>
              </View>
            )
            : null
        }
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderAddresses()}
        <View style={styles.addressBottomBorder} />
        {this.renderCalendar()}
        {this.renderSchedule()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: vars.color.lightGrey,
  },
  addressBottomBorder: {
    borderBottomWidth: 1,
    borderColor: vars.color.lightGrey,
    marginRight: 16,
    marginLeft: 16,
  },
  address: {
    flex: 1,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width - 32,
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressTitle: {
    color: vars.color.black,
    marginBottom: 6,
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
  location: {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  metro: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metroTitle: {
    ...Platform.select({
      ios: {
        color: vars.color.grey,
        fontSize: 12,
      },
    }),
  },
  map: {
    width: 40,
    height: 40,
  },
  mapButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: vars.color.grey,
    borderRadius: 50,
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: vars.color.red,
  },
  calendar: {
    marginTop: 16,
  },
  calendarTitle: {
    marginRight: 16,
    marginLeft: 16,
    fontSize: 20,
    color: vars.color.black,
    marginBottom: 6,
  },
  scheduleWrapper: {
    padding: 16,
    backgroundColor: vars.color.lightGrey,
  },
  schedule: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleTextWrapper: {
    paddingRight: 45,
  },
  calendarIcon: {
    marginRight: 16,
  },
  scheduleEmpty: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    color: vars.color.black,
  },
});
