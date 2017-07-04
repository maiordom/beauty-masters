// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';

import Input from '../components/Input';

import i18n from '../i18n';
import vars from '../vars';

const i18nEnter = Platform.select({
  ios: i18n.enterTo,
  android: i18n.enterTo.toUpperCase(),
});

const icons = {
  mail: Platform.select({
    android: require('../icons/mail.png'),
  }),
  pwd: Platform.select({
    android: require('../icons/pwd.png'),
  }),
};

export default class Login extends Component {
  render() {
    const { loginUser } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Input
            icon={icons.mail}
            style={styles.input}
            placeholder={i18n.yourEmail}
          />
          <Input
            icon={icons.pwd}
            style={styles.input}
            placeholder={i18n.passwordTip}
          />
        </View>
        <TouchableHighlight
          activeOpacity={1}
          onPress={loginUser}
          style={styles.enterButton}
          underlayColor={vars.color.red}
        >
          <Text style={styles.enterButtonText}>{i18nEnter}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  wrapper: {
    flex: 1,
  },
  input: {
    ...Platform.select({
      android: {
        marginLeft: 16,
      },
    }),
  },
  enterButton: {
    marginBottom: 15,
    backgroundColor: vars.color.red,
    borderRadius: 22,
    height: 44,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        height: 48,
        width: 240,
        borderRadius: 24,
      },
    }),
  },
  enterButtonText: {
    color: vars.color.white,
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
    }),
  },
});
