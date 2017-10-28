// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

import vars from '../vars';

const Separator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
  separator: {
    flexGrow: 1,
    backgroundColor: vars.color.cellSeparatorColorIOS,
    marginLeft: 14,
    height: 1,
  },
});

export default Separator;
