import React, { Component } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, Platform, View } from 'react-native';

import i18n from '../i18n';
import vars from '../vars';

import { shouldComponentUpdate } from '../utils';

export default class ButtonControl extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  render() {
    const {
      customStyles = {},
      label,
      onPress,
      type,
    } = this.props;

    const title = Platform.select({
      ios: label || i18n.next,
      android: (label && label.toUpperCase()) || i18n.next.toUpperCase(),
    });

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[
          styles.container,
          customStyles.nextButton,
          styles[type],
        ]}
        >
          <Text style={[styles.title, customStyles.nextText]}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    alignSelf: 'stretch',
    backgroundColor: vars.color.red,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        height: 48,
      },
    }),
  },
  disabled: {
    backgroundColor: vars.color.buttonDisabled,
  },
  green: {
    backgroundColor: vars.color.green,
  },
  title: {
    color: vars.color.white,
  },
});
