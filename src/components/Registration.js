import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Platform } from 'react-native';

import i18n from '../i18n';
import { hexToRgba } from '../utils';
import vars from '../vars';

const i18nSignUp = Platform.select({
  ios: i18n.signUp,
  android: i18n.signUp.toUpperCase()
});

export default class Registration extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            {Platform.OS === 'android' && (
              <Image source={require('../icons/mail.png')} />
            )}
            <TextInput
              style={styles.input}
              placeholder={i18n.yourEmail}
              placeholderTextColor={hexToRgba('#283741', 50)}
              underlineColorAndroid="#E4E6E8"
            />
          </View>
          <View style={styles.inputWrapper}>
            {Platform.OS === 'android' && (
              <Image source={require('../icons/pwd.png')} />
            )}
            <TextInput
              style={styles.input}
              placeholder={i18n.passwordTip}
              placeholderTextColor={hexToRgba('#283741', 50)}
              underlineColorAndroid="#E4E6E8"
            />
          </View>
          {Platform.OS === 'android'
          ? <View style={styles.manifest}>
            <Text style={[styles.registrationText, styles.manifestText]}>{i18n.pressOnRegistration[0]} {i18n.pressOnRegistration[1]}</Text>
            <Text style={[styles.agreementText, styles.manifestText]}>{i18n.userAgreement}</Text>
          </View>
          : <View style={styles.manifest}>
            <Text style={[styles.registrationText, styles.manifestText]}>{i18n.pressOnRegistration[0]}</Text>
            <Text style={[styles.registrationText, styles.manifestText]}>{i18n.pressOnRegistration[1]}</Text>
            <Text style={[styles.agreementText, styles.manifestText]}>{i18n.userAgreement}</Text>
          </View>}
        </View>
        <TouchableHighlight style={styles.registrationButton}>
          <Text style={styles.registrationButtonText}>{i18nSignUp}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    height: 44,
    ...Platform.select({
      android: {
        height: 48,
        fontSize: 16,
        marginLeft: 16
      }
    })
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: '#E4E6E8'
      }
    })
  },
  manifest: {
    marginTop: 15,
    ...Platform.select({
      ios: {
        alignItems: 'center'
      }
    })
  },
  registrationText: {
    color: vars.color.grey
  },
  agreementText: {
    color: vars.color.red
  },
  manifestText: {
    ...Platform.select({
      ios: {
        width: 290
      }
    })
  },
  wrapper: {
    flex: 1
  },
  registrationButton: {
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
        width: 240
      }
    })
  },
  registrationButtonText: {
    color: vars.color.white,
    ...Platform.select({
      ios: {
        fontSize: 17
      }
    })
  }
});
