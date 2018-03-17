/* @flow */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import vars from '../../vars';

type TProps = {
  title: string,
};

export default class MasterEditorSectionTitle extends PureComponent<TProps, void> {
  render() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: vars.color.grey,
    textAlign: 'center',
    padding: 16,
  },
  titleContainer: {
    backgroundColor: vars.color.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
