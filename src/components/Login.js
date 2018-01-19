// @flow

import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Input from '../components/Input';

import i18n from '../i18n';
import vars from '../vars';
import { trackEvent } from '../utils/Tracker';

const i18nEnter = Platform.select({
  ios: i18n.enterTo,
  android: i18n.enterTo.toUpperCase(),
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

type TProps = {
  actions: Object,
  onAuthSuccess: () => void,
};

type TState = {
  hasError: boolean,
  responseError: null | Object,
  validationStatus: null | string,
};

const ALL_FIELDS_REQUIRED = 'ALL_FIELDS_REQUIRED';

export default class Login extends Component<TProps, TState> {
  state = {
    hasError: false,
    responseError: null,
    validationStatus: null,
  };

  usernameRef: Object;
  passwordRef: Object;

  setUsernameRef = (ref: Object) => this.usernameRef = ref;
  setPasswordRef = (ref: Object) => this.passwordRef = ref;

  componentDidMount() {
    trackEvent('viewAuth');
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.error !== this.state.responseError) {
      this.setState({ responseError: nextProps.error });
    }
  }

  validate() {
    const username = this.usernameRef.getValue().trim();
    const password = this.passwordRef.getValue().trim();

    if (username.length === 0 || password.length === 0) {
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

  onLoginUserPress = () => {
    const username = this.usernameRef.getValue().trim().toLowerCase();
    const password = this.passwordRef.getValue().trim()

    if (this.validate()) {
      this.props.actions.userLogin({ username, password }).then((res) => {
        if (res.result === 'success') {
          trackEvent('authByEmail');
        }
      });
    }
  };

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
            ref={this.setUsernameRef}
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
          {validationStatus === ALL_FIELDS_REQUIRED && (
            this.error(i18n.errors.allFieldsRequired)
          )}
          {responseError && (
            this.error(responseError.detail, false)
          )}
        </View>
        <TouchableHighlight
          activeOpacity={1}
          onPress={this.onLoginUserPress}
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
  enterButtonText: {
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
