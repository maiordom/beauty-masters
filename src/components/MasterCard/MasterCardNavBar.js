// @flow

import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

const icons = {
  favs: require('../../icons/favs.png'),
  ...Platform.select({
    android: {
      back: require('../../icons/android/back-arrow.png'),
    },
    ios: {},
  }),
};

export default class MasterCardNavBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={Actions.pop}>
          <Image source={icons.back} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={icons.favs} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 16,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
