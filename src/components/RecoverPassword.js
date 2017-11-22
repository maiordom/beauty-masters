// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import ActivityIndicator from '../containers/ActivityIndicator';
import Input from './Input';
import ButtonControl from './ButtonControl';
import ModalComponent from './Modal';

import vars from '../vars';
import i18n from '../i18n';

const icons = {
  mail: Platform.select({
    android: require('../icons/mail.png'),
  }),
};

type TProps = {
  actions: {
    recoverPassword: (string) => Promise<*>
  }
}

type TState = {
  email: string,
  showModal: boolean,
  error: boolean,
}

export default class RecoverPassword extends Component<void, TProps, TState> {
  state: TState = {
    email: '',
    showModal: false,
    error: false,
    errorText: '',
  };

  onChange = (email: string) => {
    this.setState({ email });
  };

  onPress = () => {
    const { email } = this.state;

    if (email.length === 0) {
      return;
    }

    this.props.actions
      .recoverPassword(this.state.email)
      .then((response) => {
        if (response.error) {
          return this.setState({ showModal: true, error: true, errorText: response.error.detail });
        }
        this.setState({ showModal: true });
      })
      .catch(() => {
        this.setState({ error: true, showModal: true });
      });
  };

  onBack = () => {
    this.setState({
      showModal: false,
    }, () => {
      const { error } = this.state;

      if (!error) {
        return Actions.pop();
      }

      Actions.masterSetNewPassword();
    });
  };

  render() {
    const { email, showModal, error, errorText } = this.state;

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <View style={styles.wrapper}>
          <Input
            debounce
            icon={icons.mail}
            style={styles.input}
            placeholder={i18n.yourEmail}
            onChange={this.onChange}
          />
          <Text style={styles.text}>
            {i18n.forgotPassword.text}.
          </Text>
        </View>
        <ButtonControl
          type={email.length === 0 && 'disabled'}
          label={i18n.send}
          onPress={this.onPress}
        />
        <ModalComponent animationType="fade" transparent isVisible={showModal} onRequestClose={() => {}}>
          <View>
            <Text style={styles.success}>
              {error
                ? (errorText || i18n.forgotPassword.error)
                : i18n.forgotPassword.success
              }
            </Text>
            <TouchableOpacity onPress={this.onBack}>
              <Text style={styles.ok}>OK</Text>
            </TouchableOpacity>
          </View>
        </ModalComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.color.white,
  },
  wrapper: {
    flex: 1,
    marginTop: 32,
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    color: vars.color.grey,
    textAlign: Platform.select({
      android: 'left',
      ios: 'center',
    }),
    lineHeight: 25,
    marginTop: 16,
  },
  success: {
    fontSize: 16,
  },
  ok: {
    alignSelf: 'flex-end',
    marginTop: 16,
    color: vars.color.red,
    fontSize: 16,
  },
});
