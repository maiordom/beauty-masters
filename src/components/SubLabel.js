import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import vars from '../vars';

export const SubLabel = ({ label }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 36,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  text: {
    fontSize: 14,
    color: vars.color.grey,
  }
});
