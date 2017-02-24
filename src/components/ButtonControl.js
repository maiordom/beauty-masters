import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, Platform, View } from 'react-native';

import i18n from '../i18n';
import vars from '../vars';

export default class ButtonControl extends Component {
  render() {
    const { onPress, label } = this.props;

    const title = Platform.select({
      ios: label || i18n.next,
      android: (label && label.toUpperCase()) || i18n.next.toUpperCase()
    });

    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={1}
        onPress={onPress}
        style={styles.nextButton}
      >
        <Text style={styles.nextText}>{title}</Text>
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
        fontSize: 17
      },
      android: {
        height: 48
      }
    })
  },
  nextText: {
    color: vars.color.white
  }
});
