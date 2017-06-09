// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableWithoutFeedback, Platform } from 'react-native';
import moment from 'moment';

import vars from '../../vars';
import i18n from '../../i18n';

import type { MapCardType } from '../../types/MasterTypes';

const icons = {
  verified: require('../../icons/verified.png'),
  ...Platform.select({
    android: {
      pin: require('../../icons/android/pin-small.png'),
      calendar: require('../../icons/android/calendar.png'),
      ticket: require('../../icons/android/ticket.png'),
    },
  }),
};

export default class MapCard extends Component {
  props: MapCardType;

  getDate = () => {
    const { closestDate } = this.props;

    return moment(closestDate).calendar(null, {
      sameDay: `[${i18n.days.sameDay}]`,
      nextDay: `[${i18n.days.nextDay}]`,
      lastWeek: '[last] dddd',
      nextWeek: 'dddd',
      sameElse: 'L',
    }).toLowerCase();
  };

  render() {
    const {
      photo: uri,
      isVerified,
      title,
      subtitle,
      address,
      distance,
      services,
      closestDate,
      onPress,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View elevation={5} style={styles.container}>
          <View style={styles.header}>
            <View style={styles.photoWrapper}>
              <Image style={styles.photo} source={{ uri }} />
              {isVerified && (
                <Image source={icons.verified} style={styles.verified} />
              )}
            </View>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text>{subtitle}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Image style={styles.icon} source={icons.pin} />
            <Text style={styles.text}>{address}</Text>
            <View style={styles.distanceView}>
              <Text style={styles.distanceText}>
                {i18n.fromYou.toLowerCase()} {distance} {i18n.km}
              </Text>
            </View>
          </View>
          {closestDate && (
            <View style={styles.row}>
              <Image style={styles.icon} source={icons.calendar} />
              <Text style={styles.text}>{i18n.closestDate}: {this.getDate()}</Text>
            </View>
          )}
          {services && (
            <View style={[styles.row, styles.servicesRow]}>
              <Image style={styles.icon} source={icons.ticket} />
              <View style={styles.services}>
                {services.map(service => (
                  <Text key={service.serviceId} style={styles.text}>{service.serviceId} – {service.price} ₽</Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: vars.color.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    padding: 16,
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  photoWrapper: {
    marginRight: 15,
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  verified: {
    position: 'absolute',
    height: 16,
    width: 16,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 16,
    color: vars.color.black,
  },
  subtitle: {
    fontSize: 14,
    color: vars.color.grey,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: vars.color.black,
  },
  distanceView: {
    flexGrow: 2,
  },
  distanceText: {
    textAlign: 'right',
  },
  metroWrapper: {
    flexDirection: 'row',
  },
  servicesRow: {
    alignItems: 'flex-start',
  },
  services: {
    marginTop: -3,
  },
});