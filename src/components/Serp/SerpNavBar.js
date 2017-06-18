import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import vars from '../../vars';
import i18n from '../../i18n';

const DEVICE_WIDTH = Dimensions.get('window').width;
const onPress = Actions.pop;
const navBackButtonImage = require('../../icons/android/back-arrow.png');

const SerpNavBar = ({
  activeView,
  onMapPress,
  onListPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.leftButton]}
      onPress={onPress}
      activeOpacity={1}
      underlayColor
    >
      <Image source={navBackButtonImage} />
    </TouchableOpacity>
    <View style={styles.buttonsWrapper}>
      <TouchableOpacity
        style={[styles.button, activeView === 'map' && styles.activeButton]}
        onPress={onMapPress}
        activeOpacity={1}
        underlayColor
      >
        <Text style={activeView === 'map' ? styles.activeText : styles.text} lineBreakMode="tail">
          {i18n.serp.onMap}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeView === 'list' && styles.activeButton]}
        onPress={onListPress}
        activeOpacity={1}
        underlayColor
      >
        <Text style={activeView === 'list' ? styles.activeText : styles.text} lineBreakMode="tail">
          {i18n.list}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Scene = component => props => (
  <View style={styles.scene}>
    <SerpNavBar {...props} />
    {React.createElement(component, props)}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: vars.color.red,
    ...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: 54,
      },
    }),
  },
  leftButton: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
  },
  buttonsWrapper: {
    position: 'absolute',
    height: 32,
    width: 180,
    top: 10,
    marginLeft: (DEVICE_WIDTH / 2) - 90,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: vars.color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 90,
    height: 32,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: vars.color.white,
  },
  activeText: {
    color: vars.color.red,
  },
  text: {
    color: vars.color.white,
  },
});

export default SerpNavBar;
