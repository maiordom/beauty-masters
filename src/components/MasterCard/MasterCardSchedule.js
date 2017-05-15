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
} from 'react-native';
import moment from 'moment';
import debounce from 'lodash/debounce';

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

export default class MasterCardShedule extends Component {
  addressesListView = null;

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.onAddressesSwipe = debounce(this.onAddressesSwipe, 1000);

    this.state = {
      selectedAddress: 0,
      selectedDate: moment().format('YYYY-MM-DD'),
      addresses: ds.cloneWithRows(props.addresses),
    };
  }

  onDateSelect = (date: string) => this.setState({ selectedDate: date });

  getSelectedAddress = (index: ?number) => {
    const { selectedAddress } = this.state;
    const { addresses } = this.props;

    return addresses[index || selectedAddress];
  };

  onAddressesSwipe(event) {
    event.persist();
    console.log(event.nativeEvent);
  }

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
            {street}, д. {house}, стр. {building}
          </Text>
          <View style={styles.metro}>
            <Image source={icons.location} style={styles.location} />
            <Text>500 м, м. {subwayStation}</Text>
          </View>
        </View>
        <Image source={icons.map} style={styles.map} />
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
        ref={component => (this.addressesListView = component)}
        dataSource={this.state.addresses}
        renderRow={(rowData, _, index) => this.renderAddress(index)}
      />
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
      </View>
    </View>
  );

  renderCalendar = () => (
    <View style={styles.calendar}>
      <Text style={styles.calendarTitle}>{i18n.schedule.schedule}</Text>
      <Calendar
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
              <View>
                <Text style={styles.scheduleText}>Принимает с {schedule.timeStart} до {schedule.timeEnd}</Text>
                <Text style={styles.scheduleText}>Салон «{salonTitle}»</Text>
                <Text style={styles.scheduleText}>По адресу {street}, д. {house}, стр. {building}</Text>
              </View>
              <Image source={icons.map} style={styles.map} />
            </View>
          )
          : (
            <View style={styles.scheduleEmpty}>
              <Image source={icons.calendar} style={styles.calendarIcon} />
              <Text style={styles.scheduleText}>В этот день мастер не принимает</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
