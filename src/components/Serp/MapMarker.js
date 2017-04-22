// @flow

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import vars from '../../vars';

export default () => (
  <View style={styles.container}>
    <Image source={require('../../icons/pin.png')} />
    <Text style={styles.text}>1</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 34,
  },
  text: {
    position: 'absolute',
    top: 3,
    left: 8,
    color: vars.color.white,
  },
});
