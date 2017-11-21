// @flow

import React, { Component } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, Platform, View } from 'react-native';

import i18n from '../i18n';
import vars from '../vars';

import { shouldComponentUpdate } from '../utils';

const localization = {
  save: Platform.select({
    ios: i18n.save,
    android: i18n.save.toUpperCase(),
  }),
  nextStep: Platform.select({
    ios: i18n.nextStep,
    android: i18n.nextStep.toUpperCase(),
  }),
};

type TProps = {
  onNextPress: () => void;
  onSavePress: () => void;
};

export default class EditControl extends Component<TProps, void> {
  shouldComponentUpdate = shouldComponentUpdate();

  render() {
    const {
      onNextPress,
      onSavePress,
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onSavePress}>
          <View style={[styles.control, styles.save]}>
            <Text style={styles.text}>{localization.save}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onNextPress}>
          <View style={styles.control}>
            <Text style={styles.text}>{localization.nextStep}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  save: {
    borderRightWidth: 1,
    borderRightColor: vars.color.white,
  },
  control: {
    flex: 1,
    height: 44,
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
  text: {
    color: vars.color.white,
  },
});
