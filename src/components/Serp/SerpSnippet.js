// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, Platform } from 'react-native';
import moment from 'moment';

import vars from '../../vars';
import i18n from '../../i18n';

const icons = Platform.select({
  android: {
    pin: require('../../icons/android/pin-small.png'),
    calendar: require('../../icons/android/calendar.png'),
    ticket: require('../../icons/android/ticket.png'),
  },
  ios: {},
});

export default class SerpSnippet extends Component {
  props: {
    photo: ?string,
    title: string,
    type: string|number,
    metroStation: ?string,
    distance: ?number,
    closestDate: string,
    services: Array<{
      id: number,
      price: number,
    }>
  };

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
      title,
      photo: uri,
      type,
      metroStation,
      distance,
      services,
    } = this.props;

    return (
      <View elevation={5} style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.photo} source={{ uri }} />
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text>{type}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Image style={styles.icon} source={icons.pin} />
          <Text style={styles.text}>м. {metroStation}</Text>
          <View style={styles.distanceView}>
            <Text style={styles.distanceText}>
              {i18n.fromYou.toLowerCase()} {distance} {i18n.km}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Image style={styles.icon} source={icons.calendar} />
          <Text style={styles.text}>{i18n.closestDate}: {this.getDate()}</Text>
        </View>
        <View style={[styles.row, styles.servicesRow]}>
          <Image style={styles.icon} source={icons.ticket} />
          <View style={styles.services}>
            {services.map(service => (
              <Text key={service.id} style={styles.text}>{service.id} – {service.price} ₽</Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 204,
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
  photo: {
    width: 48,
    height: 48,
    borderRadius: 50,
    marginRight: 8,
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
