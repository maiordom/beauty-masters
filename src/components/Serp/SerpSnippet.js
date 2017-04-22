// @flow

import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

import vars from '../../vars';

export default () => (
  <View elevation={5} style={styles.container}>
    <Image source={require('../../icons/serp-snippet-mock.png')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 204,
    backgroundColor: vars.color.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
});
