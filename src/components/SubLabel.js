import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

import toUpper from 'lodash/toUpper';

import vars from '../vars';

const mapTitle = (title: string) => (
  Platform.select({
    android: title,
    ios: toUpper(title),
  })
);

export const SubLabel = ({ label, spacing, customStyle }) => (
  <View style={[styles.container, spacing && styles.spacing, customStyle]}>
    <Text style={styles.text}>{mapTitle(label)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 36,
    justifyContent: 'center',
  },
  spacing: {
    paddingLeft: 16,
  },
  text: {
    color: vars.color.grey,
    ...Platform.select({
      android: {
        fontSize: 14,
        lineHeight: 20,
      },
      ios: {
        fontSize: 12,
      },
    }),
  },
});
