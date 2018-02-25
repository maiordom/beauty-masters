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
import ActivityIndicator from './ActivityIndicator';

import i18n from '../i18n';
import vars from '../vars';

const icons = {
  success: Platform.select({
    android: require('../icons/android/success.png'),
  }),
};

type TProps = {
  actions: {
    routeToSerp: () => void,
    sendFeedback: (params: { email: string, text: string }) => Promise<any>,
  },
};

type TState = {
  email: string,
  isSend: boolean,
  message: string,
  renderLoader: boolean,
};

export default class Feedback extends PureComponent<TProps, TState> {
  state = {
    email: '',
    message: '',
    isSend: false,
    renderLoader: false,
  };

  onSuccessPress = () => {
    this.props.actions.routeToSerp();
  };

  onSend = () => {
    const { email, message: text } = this.state;

    this.setState({ renderLoader: true });
    this.props.actions.sendFeedback({ email, text }).then((res) => {
      const nextState = { renderLoader: false };

      if (res.status === 'success') {
        Object.assign(nextState, { isSend: true, message: '' });
      }

      this.setState(nextState);
    }).catch(() => {
      this.setState({ renderLoader: false });
    });
  };

  onEmailChange = (email: string) => {
    this.setState({ email });
  };

  onMessageChange = (message: string) => {
    this.setState({ message });
  };

  renderForm = () => {
    const { renderLoader } = this.state;

    return (
      <View style={styles.container}>
        {renderLoader && (
          <ActivityIndicator animating position="absolute" />
        )}
        <View style={styles.inner}>
          <Input
            onChange={this.onEmailChange}
            placeholder={i18n.feedbackForm.email}
            style={styles.emailInput}
          />
          <View style={styles.message}>
            <Input
              blurOnSubmit
              multiline
              numberOfLines={4}
              onChange={this.onMessageChange}
              placeholder={i18n.feedbackForm.message}
              returnKeyType={'default'}
              style={styles.messageInput}
            />
          </View>
        </View>
        <ButtonControl
          label={i18n.send}
          onPress={this.onSend}
        />
      </View>
    );
  };

  renderSuccess = () => (
    <View style={styles.container}>
      <View style={styles.success}>
        <Image style={styles.icon} source={icons.success} />
        <Text style={styles.title}>{i18n.feedbackForm.successTitle}</Text>
        <Text style={styles.text}>{i18n.feedbackForm.successMessage}</Text>
      </View>
      <ButtonControl
        onPress={this.onSuccessPress}
        label={i18n.registrationComplete.ok}
      />
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
  emailInput: {
    marginBottom: 10,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 0,
  },
  inner: {
    flex: 1,
    ...Platform.select({
      android: {
        paddingLeft: 12,
        paddingRight: 12,
      },
    }),
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
