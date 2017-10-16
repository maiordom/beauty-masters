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
  ...Platform.select({
    android: {
      password: require('../icons/password.png'),
    },
  }),
};

type TProps = {
  token: string,
  actions: {
    setNewPwd: (string, token) => Promise<*>
  }
}

type TState = {
  pwd1: string,
  pwd2: string,
  showModal: boolean,
  error: boolean,
}

export default class RecoverPwd extends Component<void, TProps, TState> {
  state: TState = {
    pwd1: '',
    pwd2: '',
    showModal: false,
    error: false,
    errorText: '',
  };

  onEnterPwd = (key: string) => (pwd: string) => {
    this.setState({ [key]: pwd });
  };

  onPress = () => {
    const { token = 'todo-remove-test-token' } = this.props
    const { pwd1, pwd2 } = this.state;

    if (pwd1 !== pwd2) {
      return;
    }

    this.props.actions
      .setNewPwd(pwd1, token)
      .then((response) => {
        if (response.error) {
          return this.setState({ error: true, showModal: true });
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
        Actions.root();
      }
    });
  };

  render() {
    const { pwd1, pwd2, showModal, error } = this.state;

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <View style={styles.wrapper}>
          <Input
            debounce
            style={styles.input}
            debounceTimer={200}
            icon={icons.password}
            placeholder={i18n.passwordTip}
            secureTextEntry
            onChange={this.onEnterPwd('pwd1')}
          />
          <Input
            debounce
            style={styles.input}
            debounceTimer={200}
            icon={icons.password}
            placeholder={i18n.passwordRepeat}
            secureTextEntry
            onChange={this.onEnterPwd('pwd2')}
          />
        </View>
        <ButtonControl
          type={pwd1 !== pwd2 && 'disabled'}
          label={i18n.setNewPwd.set}
          onPress={this.onPress}
        />
        <ModalComponent animationType="fade" transparent isVisible={showModal} onRequestClose={() => {}}>
          <View>
            <Text style={styles.success}>
              {error
                ? i18n.setNewPwd.error
                : i18n.setNewPwd.success
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
