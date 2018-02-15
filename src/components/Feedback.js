// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Input from './Input';
import ButtonControl from './ButtonControl';

import i18n from '../i18n';
import vars from '../vars';

const icons = {
  success: Platform.select({
    android: require('../icons/android/success.png'),
  }),
};

type TDefaultProps = {
  email: string,
}

type TProps = {
  email: string,
}

type TState = {
  email: string,
  message: string,
  isSend: boolean,
}

export default class Feedback extends PureComponent<TProps, TState, TDefaultProps> {
  static defaultProps = {
    email: '',
  };

  state = {
    email: this.props.email,
    message: '',
    isSend: false,
  };

  onSend = () => {
    this.setState({ isSend: true, message: '' });
  };

  onEmailChange = (email: string) => {
    this.setState({ email });
  };

  onMessageChange = (message: string) => {
    this.setState({ message });
  };

  renderForm = () => {
    const { email, message } = this.state;

    return (
      <View style={styles.container}>
        <Input placeholder={i18n.feedbackForm.email} defaultValue={email} onChange={this.onEmailChange} />
        <View style={styles.message}>
          <TextInput
            onChangeText={this.onMessageChange}
            value={message}
            placeholder={i18n.feedbackForm.message}
            multiline
            numberOfLines={10}
          />
        </View>
        <ButtonControl onPress={this.onSend} label={i18n.send} />
      </View>
    );
  };

  renderSuccess = () => (
    <View style={styles.container}>
      <View style={styles.success}>
        <Image style={styles.icon} source={icons.success} />
        <Text style={styles.title}>{i18n.successTitle}</Text>
        <Text style={styles.text}>{i18n.successMessage}</Text>
      </View>
      <ButtonControl onPress={Actions.pop} label={i18n.registrationComplete.ok} />
    </View>
  );

  render() {
    const { isSend } = this.state;

    return isSend ? this.renderSuccess() : this.renderForm();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    flex: 1,
  },
  success: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    paddingLeft: 16,
  },
  icon: {
    marginBottom: 32,
  },
  title: {
    fontSize: 16,
    color: vars.color.black,
    marginBottom: 9,
  },
  text: {
    textAlign: 'center',
  },
});
