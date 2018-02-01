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
    ios: {
      pin: require('../../icons/ios/pin-small.png'),
      calendar: require('../../icons/ios/calendar-small.png'),
      ticket: require('../../icons/ios/ticket-small.png'),
    },
  }),
};

type TMapCardView = {
  type?: string,
  location: string,
  onPress: Function,
  onLayout: Function,
};

type TProps = TMapCard & TMapCardView;

export default class MapCard extends Component<TProps, void> {
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
      <TouchableWithoutFeedback onPress={this.onPress} onLayout={this.props.onLayout}>
        <View elevation={5} style={[styles.container, location === 'map' && styles.modMap]}>
          <View style={styles.header}>
            <View style={styles.photoWrapper}>
              {uri
                ? <Image style={styles.photo} source={{ uri }} />
                : <Image style={styles.photo} source={icons.photoEmpty} />}
            </View>
            <View style={styles.titlesContainer}>
              <Text style={styles.title}>{username}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
          <View style={[styles.row, styles.rowTitle]}>
            <Image style={styles.icon} source={icons.pin} />
            <Text style={styles.addressText} numberOfLines={1}>{address}</Text>
            {type !== 'favorites' && (
              <Text style={styles.distanceText}>
                {distance === null ? '' : `${i18n.fromYou.toLowerCase()} ${distance} ${i18n.km}`}
              </Text>
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
                  <Text key={service.id} style={styles.text}>{service.title} – {service.price} {`\u20BD`}</Text>
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
  addressText: {
    fontSize: 14,
    color: vars.color.black,
    flex: 1,
    flexShrink: 1,
  },
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: vars.color.white,
    padding: 16,
    ...Platform.select({
      android: {
        shadowRadius: 10,
        shadowOpacity: 0.8,
        shadowColor: vars.color.black,
        shadowOffset: {
          width: 0,
          height: 3,
        },
      },
    }),
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
    ...Platform.select({
      ios: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      android: {
        width: 48,
        height: 48,
        borderRadius: 50,
      },
    }),
  },
  rowTitle: {
    paddingRight: 16,
  },
  titlesContainer: {
    ...Platform.select({
      ios: {
        justifyContent: 'space-between',
      },
    }),
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
  subtitle: {
    color: vars.color.grey,
    ...Platform.select({
      ios: {
        fontSize: 12,
      },
      android: {
        fontSize: 14,
      },
    }),
  },
  icon: {
    ...Platform.select({
      ios: {
        marginRight: 10,
      },
      android: {
        marginRight: 8,
      },
    }),
  },
  text: {
    fontSize: 14,
    color: vars.color.black,
  },
  distanceText: {
    textAlign: 'right',
    ...Platform.select({
      ios: {
        color: vars.color.grey,
      },
    }),
  },
  metroWrapper: {
    flexDirection: 'row',
  },
  servicesRow: {
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  services: {
    marginTop: -3,
  },
});
