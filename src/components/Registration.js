import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';

import Input from '../components/Input';

import i18n from '../i18n';
import vars from '../vars';

const i18nSignUp = Platform.select({
  ios: i18n.signUp,
  android: i18n.signUp.toUpperCase(),
});

const icons = {
    ...Platform.select({
        android: {
            email: require('../icons/mail.png'),
            pwd: require('../icons/pwd.png'),
        },
    })
};

export default class Registration extends Component {
  onUserCreatePress = () => {
    const email = this.emailRef.getValue();
    const pwd = this.pwdRef.getValue();

    this.props.actions.userCreate({ email, password: pwd });
  };

  setEmailRef = ref => this.emailRef = ref;
  setPwdRef = ref => this.pwdRef = ref;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Input
            ref={this.setEmailRef}
            icon={icons.email}
            style={styles.input}
            placeholder={i18n.yourEmail}
          />
          <Input
            ref={this.setPwdRef}
            icon={icons.pwd}
            style={styles.input}
            placeholder={i18n.passwordTip}
          />
          {Platform.OS === 'android'
          ? <View style={styles.manifest}>
            <Text style={[styles.registrationText, styles.manifestText]}>
              {i18n.pressOnRegistration[0]} {i18n.pressOnRegistration[1]}
            </Text>
            <Text style={[styles.agreementText, styles.manifestText]}>{i18n.userAgreement}</Text>
          </View>
          : <View style={styles.manifest}>
            <Text style={[styles.registrationText, styles.manifestText]}>{i18n.pressOnRegistration[0]}</Text>
            <Text style={[styles.registrationText, styles.manifestText]}>{i18n.pressOnRegistration[1]}</Text>
            <Text style={[styles.agreementText, styles.manifestText]}>{i18n.userAgreement}</Text>
          </View>}
        </View>
        <TouchableHighlight
          activeOpacity={1}
          onPress={this.onUserCreatePress}
          style={styles.enterButton}
          underlayColor={vars.color.red}
        >
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
    marginRight: 15,
  },
  input: {
    ...Platform.select({
      android: {
        marginLeft: 16,
      },
    }),
  },
  manifest: {
    marginTop: 15,
    ...Platform.select({
      ios: {
        alignItems: 'center',
      },
    }),
  },
  registrationText: {
    color: vars.color.grey,
  },
  agreementText: {
    color: vars.color.red,
  },
  manifestText: {
    ...Platform.select({
      ios: {
        width: 290,
      },
    }),
  },
  wrapper: {
    flex: 1,
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
  registrationButtonText: {
    color: vars.color.white,
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
    }),
  },
});
