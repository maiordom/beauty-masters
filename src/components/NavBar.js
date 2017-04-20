import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

const DEVICE_WIDTH = Dimensions.get('window').width;

import vars from '../vars';

const onPress = Actions.pop;
const navBackButtonImage = require('../icons/android/back-arrow.png');

const NavBar = ({ title, leftButtonIconStyle, backButtonImage }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.leftButton}
      onPress={onPress}
    >
      <Image style={leftButtonIconStyle} source={backButtonImage || navBackButtonImage} />
    </TouchableOpacity>
    <Text
      style={[styles.title, { width: DEVICE_WIDTH - 20 - 16 * 2 - 16 }]}
      lineBreakMode="tail"
      numberOfLines={1}
    >{title}</Text>
  </View>
);

const Scene = (props, component) => (
  <View style={styles.scene}>
    <NavBar {...props} />
    {React.createElement(component, props)}
  </View>
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 64,
      },
      android: {
        paddingTop: 54,
      },
    })
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: vars.color.red,
    ...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: 54,
      },
    })
  },
  title: {
    color: vars.color.white,
    fontSize: 20,
    alignSelf: 'center',
  },
  leftButton: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center'
  },
});

export default Scene;
