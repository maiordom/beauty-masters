// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Platform, Image } from 'react-native';

import Input from '../components/Input';

import i18n from '../i18n';
import vars from '../vars';
import { trackEvent } from '../utils/Tracker';

const i18nSignUp = Platform.select({
  ios: i18n.signUp,
  android: i18n.signUp.toUpperCase(),
});

const icons = {
  ...Platform.select({
    android: {
      email: require('../icons/mail.png'),
      password: require('../icons/password.png'),
      warning: require('../icons/android/warning.png'),
    },
  }),
};

const ALL_FIELDS_REQUIRED = 'ALL_FIELDS_REQUIRED';

type TProps = {
  actions: Object,
  onAuthSuccess: () => void,
};

type TState = {
  hasError: boolean,
  responseError: null | Object,
  validationStatus: null | string,
};

export default class Registration extends Component<TProps, TState> {
  state = {
    hasError: false,
    responseError: null,
    validationStatus: null,
  };

  emailRef: Object;
  passwordRef: Object;

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.error !== this.state.responseError) {
      this.setState({ responseError: nextProps.error });
    }
  }

  componentDidMount() {
    trackEvent('viewReg');
  }

  onUserCreatePress = () => {
    const email = this.emailRef.getValue().trim().toLowerCase();
    const password = this.passwordRef.getValue().trim().toLowerCase();

    if (this.validate()) {
      this.props.actions.userCreate({ email, password });
    }
  };

  validate() {
    const email = this.emailRef.getValue().trim();
    const password = this.passwordRef.getValue().trim();

    if (email.length === 0 || password.length === 0) {
      this.setState({ validationStatus: ALL_FIELDS_REQUIRED, hasError: true });
      return false;
    }

    this.setState({ validationStatus: null, hasError: false });
    return true;
  }

  onChangeInput = () => {
    if (this.state.hasError) {
      this.validate();
    }
  };

  error = (text: string, withImage: boolean = true) => (
    <View style={styles.error}>
      <Text style={styles.errorText}>{text}</Text>
      {withImage && (
        <Image source={icons.warning} />
      )}
    </View>
  );

  setEmailRef = (ref: Object) => { this.emailRef = ref; };
  setPasswordRef = (ref: Object) => { this.passwordRef = ref; };

  render() {
    const { validationStatus, responseError } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Input
            debounce
            debounceTimer={200}
            icon={icons.email}
            onChange={this.onChangeInput}
            placeholder={i18n.yourEmail}
            ref={this.setEmailRef}
            style={styles.input}
          />
          <Input
            debounce
            debounceTimer={200}
            icon={icons.password}
            onChange={this.onChangeInput}
            placeholder={i18n.passwordTip}
            ref={this.setPasswordRef}
            secureTextEntry
            style={styles.input}
          />
          {Platform.OS === 'android'
            ? (
              <View style={styles.manifest}>
                <Text style={[styles.registrationText, styles.manifestText]}>
                  {i18n.pressOnRegistration[0]} {i18n.pressOnRegistration[1]}
                </Text>
                <Text style={[styles.agreementText, styles.manifestText]}>{i18n.userAgreement}</Text>
              </View>
            )
            : (
              <View style={styles.manifest}>
                <Text style={[styles.registrationText, styles.manifestText]}>{i18n.pressOnRegistration[0]}</Text>
                <Text style={[styles.registrationText, styles.manifestText]}>{i18n.pressOnRegistration[1]}</Text>
                <Text style={[styles.agreementText, styles.manifestText]}>{i18n.userAgreement}</Text>
              </View>
            )
          }
          {validationStatus === ALL_FIELDS_REQUIRED && (
            this.error(i18n.errors.allFieldsRequired)
          )}
          {responseError && (
            this.error(responseError.detail, false)
          )}
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
    textAlign: 'center',
  },
  agreementText: {
    color: vars.color.red,
    textAlign: 'center',
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
    justifyContent: 'center',
    ...Platform.select({
      android: {
        height: 48,
        width: 240,
        borderRadius: 24,
        alignSelf: 'center',
      },
      ios: {
        paddingTop: 12,
        paddingBottom: 12,
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
  error: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: vars.color.red,
  },
});
