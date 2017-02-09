import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';

import i18n from '../i18n';
import vars from '../vars';

const i18nNext = Platform.select({
  ios: i18n.next,
  android: i18n.next.toUpperCase()
});

export default class ButtonNext extends Component {
  render() {
    const { onPress } = this.props;

    return (
        <TouchableHighlight onPress={onPress} style={styles.nextButton}>
          <Text style={styles.nextText}>{i18nNext}</Text>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  nextButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: vars.color.red,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        height: 48
      }
    })
  },
  nextText: {
    color: vars.color.white
  }
});
