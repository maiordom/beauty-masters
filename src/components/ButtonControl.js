import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform, View } from 'react-native';

import i18n from '../i18n';
import vars from '../vars';

export default class ButtonControl extends PureComponent {
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
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          customStyles.nextButton,
          styles[type],
        ]}
      >
        <Text style={[styles.title, customStyles.nextText]}>{title}</Text>
      </TouchableOpacity>
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
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
    }),
  },
});
