import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';

import i18n from '../i18n';
import { hexToRgba } from '../utils';
import vars from '../vars';

export default class Registration extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder={i18n.yourEmail}
              placeholderTextColor={hexToRgba('#283741', 50)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder={i18n.passwordTip}
              placeholderTextColor={hexToRgba('#283741', 50)}
            />
          </View>
          <View style={styles.manifest}>
            <Text style={[styles.registrationText, styles.text]}>{i18n.pressOnRegistration[0]}</Text>
            <Text style={[styles.registrationText, styles.text]}>{i18n.pressOnRegistration[1]}</Text>
            <Text style={[styles.agreementText, styles.text]}>{i18n.userAgreement}</Text>
          </View>
        </View>
        <TouchableHighlight style={styles.registrationButton}>
          <Text style={styles.registrationButtonText}>{i18n.signUp}</Text>
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
    height: 44,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6E8'
  },
  manifest: {
    marginTop: 15,
    alignItems: 'center'
  },
  registrationText: {
    color: vars.color.grey
  },
  agreementText: {
    color: vars.color.red
  },
  text: {
    fontSize: 14,
    width: 290,
    textAlign: 'center'
  },
  registrationButton: {
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: 15,
    backgroundColor: vars.color.red,
    borderRadius: 22,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  registrationButtonText: {
    color: vars.color.white,
    fontSize: 17
  }
});
