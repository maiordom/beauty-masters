import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import vars from '../vars';

export const SubLabel = ({ label, spacing, customStyle }) => (
  <View style={[styles.container, spacing && styles.spacing, customStyle]}>
    <Text style={styles.text}>{label}</Text>
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
    lineHeight: 20,
    fontSize: 14,
    color: vars.color.grey,
  },
});
