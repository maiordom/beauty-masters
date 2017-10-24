// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import vars from '../vars';

export default class Separator extends PureComponent {
  shouldComponentUpdate = () => false;

  render() {
    return (<View style={styles.separator} />);
  }
}

const styles = StyleSheet.create({
  separator: {
    flexGrow: 1,
    backgroundColor: vars.color.cellSeparatorColorIOS,
    marginLeft: 14,
    height: 1,
  },
});
