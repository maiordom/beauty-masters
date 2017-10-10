// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableWithoutFeedback, Platform } from 'react-native';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import vars from '../../vars';
import i18n from '../../i18n';

import type { TMapCard } from '../../types/MasterTypes';

const icons = {
  photoEmpty: require('../../icons/photo-empty.png'),
  ...Platform.select({
    android: {
      pin: require('../../icons/android/pin-small.png'),
      calendar: require('../../icons/android/calendar.png'),
      ticket: require('../../icons/android/ticket.png'),
    },
  }),
};

type TProps = TMapCard & {
  type?: string,
};

type TState = {
  distance: number,
};

export default class MapCard extends Component<TProps, TState> {
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

  onPress = () => {
    this.props.onPress(this.props);
  };

  render() {
    const {
      address,
      closestDate,
      distance,
      isSalon,
      location,
      photo: uri,
      services,
      type,
      username,
    } = this.props;

    const subtitle = isSalon ? i18n.card.salon : i18n.card.privateMaster;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View elevation={5} style={[styles.container, location === 'map' && styles.modMap]}>
          <View style={styles.header}>
            <View style={styles.photoWrapper}>
              {uri
                ? <Image style={styles.photo} source={{ uri }} />
                : <Image style={styles.photo} source={icons.photoEmpty} />}
            </View>
            <View>
              <Text style={styles.title}>{username}</Text>
              <Text>{subtitle}</Text>
            </View>
          </View>
          <View style={[styles.row, styles.rowTitle]}>
            <Image style={styles.icon} source={icons.pin} />
            <Text style={styles.text}>{address}</Text>
            {type !== 'favorites' && (
              <View style={styles.distanceView}>
                <Text style={styles.distanceText}>
                  {i18n.fromYou.toLowerCase()} {distance} {i18n.km}
                </Text>
              </View>
            )}
          </View>
          {closestDate && (
            <View style={styles.row}>
              <Image style={styles.icon} source={icons.calendar} />
              <Text style={styles.text}>{i18n.closestDate}: {this.getDate()}</Text>
            </View>
          )}
          {!isEmpty(services) && (
            <View style={[styles.row, styles.servicesRow]}>
              <Image style={styles.icon} source={icons.ticket} />
              <View style={styles.services}>
                {services.map(service => (
                  <Text key={service.id} style={styles.text}>{service.title} – {service.price} р</Text>
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
  modMap: {
    paddingRight: 0,
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
  rowTitle: {
    paddingRight: 16,
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
