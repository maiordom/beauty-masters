import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import i18n from '../../i18n';
import vars from '../../vars';
import styles from './styles';

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
            underlayColor={vars.color.white}
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
