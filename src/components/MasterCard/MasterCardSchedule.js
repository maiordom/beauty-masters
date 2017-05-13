// @flow

import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import Calendar from '../Calendar';

import i18n from '../../i18n';
import vars from '../../vars';

const icons = {
  location: require('../../icons/location-small.png'),
  map: require('../../icons/map.png'),
};

export default class MasterCardShedule extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}} activeOpacity={1} underlayColor>
          <View style={styles.addressWrapper}>
            <View style={styles.address}>
              <View>
                <Text style={styles.addressTitle}>
                  Трамвайный пр., д. 28
                </Text>
                <View style={styles.metro}>
                  <Image source={icons.location} style={styles.location} />
                  <Text>500 м, м. Ленинский проспект</Text>
                </View>
              </View>
              <Image source={icons.map} style={styles.map} />
            </View>
            <View style={styles.dots}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.calendar}>
          <Text style={styles.calendarTitle}>{i18n.schedule.schedule}</Text>
          <Calendar />
        </View>
        <View style={styles.schedule}>
          <View>
            <Text style={styles.scheduleText}>Принимает с 10:00 до 14:00</Text>
            <Text style={styles.scheduleText}>Салон «Пилки»</Text>
            <Text style={styles.scheduleText}>По адресу Ленинский пр., д. 127</Text>
          </View>
          <Image source={icons.map} style={styles.map} />
        </View>
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
  addressWrapper: {
    marginRight: 16,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderColor: vars.color.lightGrey,
  },
  address: {
    marginTop: 16,
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
    color: vars.color.grey,
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
  schedule: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: vars.color.lightGrey,
  },
  scheduleText: {
    color: vars.color.black,
  },
});
