import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import vars from '../vars';

export const FilterLabel = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    backgroundColor: vars.color.lightGrey,
    justifyContent: 'center',
    height: 44,
    ...Platform.select({
      android: {
        height: 48,
        borderBottomColor: vars.color.borderColorAndroid,
        borderBottomWidth: 1,
        borderTopColor: vars.color.borderColorAndroid,
        borderTopWidth: 1,
      },
    }),
  },
  text: {
    color: vars.color.grey,
  },
});
