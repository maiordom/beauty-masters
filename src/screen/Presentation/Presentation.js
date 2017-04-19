import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import vars from '../../vars';
import i18n from '../../i18n';

import { hexToRgba } from '../../utils';

const icons = Platform.select({
  ios: {
    pin: require('./icons/ios/pin.png'),
    list: require('./icons/ios/list.png'),
    photo: require('./icons/ios/photo.png'),
    calendar: require('./icons/ios/calendar.png'),
  },
  android: {
    pin: require('./icons/android/pin.png'),
    list: require('./icons/android/list.png'),
    photo: require('./icons/android/photo.png'),
    calendar: require('./icons/android/calendar.png'),
  },
});

const i18nContinue = Platform.select({
  ios: i18n.continue,
  android: i18n.continue.toUpperCase(),
});

const i18nAuthAsMaster = Platform.select({
  ios: i18n.authAsMaster,
  android: i18n.authAsMaster.toUpperCase(),
});

export default class Presentation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image style={styles.logo} source={require('../../icons/logo.png')} />
          <Text style={styles.title}>{i18n.presentation.title}</Text>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Image source={icons.pin} />
              <Text style={styles.text}>{i18n.presentation.pin}</Text>
            </View>
            <View style={styles.listItem}>
              <Image source={icons.list} />
              <Text style={styles.text}>{i18n.presentation.list}</Text>
            </View>
            <View style={styles.listItem}>
              <Image source={icons.photo} />
              <Text style={styles.text}>{i18n.presentation.photo}</Text>
            </View>
            <View style={styles.listItem}>
              <Image source={icons.calendar} />
              <Text style={styles.text}>{i18n.presentation.calendar}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableHighlight
            activeOpacity={1}
            onPress={Actions.searchForm}
            style={styles.continueButton}
            underlayColor="transparent"
          >
            <Text style={styles.continueText}>{i18nContinue}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={1}
            onPress={Actions.masterAuthorization}
            style={styles.authButton}
            underlayColor="transparent"
          >
            <Text style={styles.authText}>{i18nAuthAsMaster}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: vars.bodyColor,
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  bottomContainer: {
    alignItems: 'center',
  },
  logo: {
    marginBottom: 15,
  },
  title: {
    width: 290,
    marginBottom: 15,
    color: vars.color.white,
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        fontSize: 18,
      },
    }),
  },
  text: {
    color: vars.color.white,
    marginLeft: 15,
    ...Platform.select({
      android: {
        fontSize: 16,
      },
    }),
  },
  listItem: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueButton: {
    alignSelf: 'center',
    backgroundColor: vars.color.white,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        width: 290,
        height: 44,
      },
      android: {
        width: 280,
        height: 48,
        borderRadius: 24,
      },
    }),
  },
  continueText: {
    color: vars.color.red,
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
    }),
  },
  authButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        height: 56,
        justifyContent: 'center',
      },
      android: {
        marginTop: 20,
        height: 48,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: hexToRgba(vars.color.white, 30),
      },
    }),
  },
  authText: {
    color: vars.color.white,
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
    }),
  },
});
