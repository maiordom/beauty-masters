import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import vars from '../vars';

export const FilterLabel = ({ text }) => {
  const title = Platform.select({
    ios: text.toUpperCase(),
    android: text,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default null;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    backgroundColor: vars.color.lightGrey,
    justifyContent: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    ...Platform.select({
      android: {
        height: 48,
        borderBottomColor: vars.color.borderColorAndroid,
        borderTopColor: vars.color.borderColorAndroid,
      },
      ios: {
        borderBottomColor: vars.color.cellSeparatorColorIOS,
        borderTopColor: vars.color.cellSeparatorColorIOS,
      },
    }),
  },
  text: {
    color: vars.color.grey,
    ...Platform.select({
      ios: {
        fontSize: 12,
      },
    }),
  },
});
