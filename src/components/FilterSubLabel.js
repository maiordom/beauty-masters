// @flow

import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Platform } from 'react-native';
import Separator from './Separator.ios';

import vars from '../vars';

type TProps = {
  title: string,
  shouldShowSeparator: boolean,
};

export default class FilterSubLabel extends Component<TProps, void> {
  static defaultProps = {
    title: '',
    shouldShowSeparator: true,
  }

  shouldComponentUpdate = () => false;

  render() {
    const {
      title,
      shouldShowSeparator,
    } = this.props;

    const renderTitle = Platform.select({
      ios: title.toUpperCase(),
      android: title,
    });

    return (
      <View style={styles.container}>
        <TouchableHighlight underlayColor="transparent" activeOpacity={1} style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.title}>{renderTitle}</Text>
          </View>
        </TouchableHighlight>
        {shouldShowSeparator && Platform.OS === 'ios' && (
          <Separator />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  button: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonContent: {
    height: 44,
    ...Platform.select({
      android: {
        height: 48,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: vars.color.grey,
    ...Platform.select({
      android: {
        fontSize: 14,
      },
      ios: {
        fontSize: 12,
      },
    }),
  },
});
