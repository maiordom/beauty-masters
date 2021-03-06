// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';

import vars from '../vars';

type TProps = {
  style?: StyleSheet,
};

const Separator = (props: TProps) => (
  <View style={[styles.separator, props.style]} />
);

Separator.defaultProps = { style: null };

const styles = StyleSheet.create({
  separator: {
    flexGrow: 1,
    backgroundColor: vars.color.cellSeparatorColorIOS,
    marginLeft: 14,
    height: 1,
  },
});

export default Separator;
