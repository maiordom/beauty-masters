import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableHighlight, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import i18n from '../../i18n';
import vars from '../../vars';
import styles from './styles';

const icons = Platform.select({
  ios: {
    calendar: require('./icons/ios/calendar.png'),
    list: require('./icons/ios/list.png'),
    logo: require('../../icons/logo.png'),
    photo: require('./icons/ios/photo.png'),
    pin: require('./icons/ios/pin.png'),
  },
  android: {
    calendar: require('./icons/android/calendar.png'),
    list: require('./icons/android/list.png'),
    logo: require('../../icons/logo.png'),
    photo: require('./icons/android/photo.png'),
    pin: require('./icons/android/pin.png'),
  },
});

const localization = {
  continue: Platform.select({
    ios: i18n.continue,
    android: i18n.continue.toUpperCase(),
  }),
  authAsMaster: Platform.select({
    ios: i18n.authAsMaster,
    android: i18n.authAsMaster.toUpperCase(),
  }),
};

export default class Presentation extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image style={styles.logo} source={icons.logo} />
          <Text style={styles.title}>{i18n.presentation.title}</Text>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Image style={styles.icon} source={icons.pin} />
              <Text style={styles.text}>{i18n.presentation.pin}</Text>
            </View>
            <View style={styles.listItem}>
              <Image style={styles.icon} source={icons.list} />
              <Text style={styles.text}>{i18n.presentation.list}</Text>
            </View>
            <View style={styles.listItem}>
              <Image style={styles.icon} source={icons.photo} />
              <Text style={styles.text}>{i18n.presentation.photo}</Text>
            </View>
            <View style={styles.listItem}>
              <Image style={styles.icon} source={icons.calendar} />
              <Text style={styles.text}>{i18n.presentation.calendar}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableHighlight
            activeOpacity={1}
            onPress={Actions.serp}
            style={styles.continueButton}
            underlayColor={vars.color.white}
          >
            <Text style={styles.continueText}>{localization.continue}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={1}
            onPress={Actions.masterAuthorization}
            style={styles.authButton}
            underlayColor="transparent"
          >
            <Text style={styles.authText}>{localization.authAsMaster}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
