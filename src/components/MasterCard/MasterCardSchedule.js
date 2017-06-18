// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ListView,
  Platform,
  Dimensions,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import Calendar from '../Calendar';

import i18n from '../../i18n';
import vars from '../../vars';

const icons = {
  location: require('../../icons/location-small.png'),
  map: require('../../icons/map.png'),
  ...Platform.select({
    android: {
      calendar: require('../../icons/android/calendar.png'),
    },
  }),
};

type Address = {
  id: number,
  masterSchedules: Array<any>,
  salonTitle: string,
  street: string,
  house: string,
  building?: string,
  subwayStation?: string,
  latlng: {
    lattitude: string,
    longitude: string,
  },
};

type Props = {
  scrollToEnd: Function,
  addresses: Array<Address>
};

type State = {
  selectedAddress: number,
  selectedDate: string,
  addresses: any,
};

export default class MasterCardShedule extends Component<void, Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      selectedAddress: 0,
      selectedDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      addresses: ds.cloneWithRows(props.addresses),
    };
  }

  onDateSelect = (date: string) => {
    this.setState({ selectedDate: date });
    InteractionManager.runAfterInteractions(() => {
      this.props.scrollToEnd();
    });
  };

  onMapPress = () => {
    const {
      latlng,
      salonTitle,
      street,
      house,
      building,
    } = this.getSelectedAddress();

    Actions.masterLocation({
      latlng,
      title: 'Марина Ф',
      subtitle: salonTitle,
      address: `${street}, ${i18n.houseShort} ${house} ${building || ''}`,
      isVerified: true,
    });
  };

  getSelectedAddress = (index: ?number): Address => {
    const { selectedAddress } = this.state;
    const { addresses } = this.props;

    return addresses[index || selectedAddress];
  };

  onAddressesSwipe = (event: any) => {
    const clientWidth = Dimensions.get('window').width;
    const xOffset = event.nativeEvent.contentOffset.x;
    const selectedAddress = Math.round(xOffset / clientWidth);

    if (this.state.selectedAddress !== selectedAddress) {
      this.setState({ selectedAddress });
    }
  };

  renderAddress = (index: number) => {
    const {
      street,
      house,
      building,
      subwayStation,
    } = this.getSelectedAddress(index);

    return (
      <View style={styles.address}>
        <View>
          <Text style={styles.addressTitle}>
            {street}, {i18n.houseShort}. {house}, {i18n.buildingShort}. {building}
          </Text>
          <View style={styles.metro}>
            <Image source={icons.location} style={styles.location} />
            <Text>{i18n.metroShort}. {subwayStation}</Text>
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
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={this.onAddressesSwipe}
        scrollEventThrottle={200}
        dataSource={this.state.addresses}
        renderRow={(rowData, _, index) => this.renderAddress(index)}
      />
      <View style={styles.dots}>
        {this.props.addresses.map((address, index) => (
          <View
            key={address.id}
            style={[styles.dot, this.state.selectedAddress === index ? styles.dotActive : {}]}
          />
        ))}
      </View>
    </View>
  );

  renderCalendar = () => (
    <View style={styles.calendar}>
      <Text style={styles.calendarTitle}>{i18n.schedule.schedule}</Text>
      <Calendar
        activeFrom={moment()}
        selectedDate={this.state.selectedDate}
        onDateSelect={this.onDateSelect}
      />
    </View>
  );

  renderSchedule = () => {
    const { selectedDate } = this.state;

    const {
      masterSchedules,
      salonTitle,
      street,
      house,
      building,
    } = this.getSelectedAddress();

    const schedule = masterSchedules.find(day => day.date === selectedDate);

    return (
      <View style={styles.scheduleWrapper}>
        {schedule
          ? (
            <View style={styles.schedule}>
              <View style={styles.scheduleTextWrapper}>
                <Text style={styles.scheduleText}>
                  {i18n.accept} {i18n.from.toLowerCase()} {schedule.timeStart}
                  {' '}{i18n.to.toLowerCase()} {schedule.timeEnd}
                </Text>
                <Text style={styles.scheduleText}>{i18n.salon} «{salonTitle}»</Text>
                <Text style={styles.scheduleText}>
                  {i18n.onAddress} {street}, {i18n.houseShort}. {house}, {i18n.buildingShort}. {building}
                </Text>
              </View>
              <TouchableOpacity onPress={this.onMapPress} style={styles.mapButton}>
                <Image source={icons.map} style={styles.map} />
              </TouchableOpacity>
            </View>
          )
          : (
            <View style={styles.scheduleEmpty}>
              <Image source={icons.calendar} style={styles.calendarIcon} />
              <Text style={styles.scheduleText}>{i18n.acceptNot}</Text>
            </View>
          )
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
    fontSize: 16,
    color: vars.color.black,
    marginBottom: 6,
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
