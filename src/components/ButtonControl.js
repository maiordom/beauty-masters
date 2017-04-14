import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, Platform, View } from 'react-native';

import i18n from '../i18n';
import vars from '../vars';

import { shouldComponentUpdate } from '../utils';

export default class ButtonControl extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  render() {
    const { onPress, label, customStyles = {} } = this.props;

    const title = Platform.select({
      ios: label || i18n.next,
      android: (label && label.toUpperCase()) || i18n.next.toUpperCase(),
    });

    return (
      <TouchableHighlight
        underlayColor={vars.color.red}
        activeOpacity={1}
        onPress={onPress}
        style={[styles.nextButton, customStyles.nextButton]}
      >
        <Text style={[styles.nextText, customStyles.nextText]}>{title}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  nextButton: {
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
  nextText: {
    color: vars.color.white,
  },
});
