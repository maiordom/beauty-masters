import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { drawerOpen } from '../../actions/Drawer';
import LinearGradient from 'react-native-linear-gradient';

import vars from '../../vars';
import i18n from '../../i18n';

const DEVICE_WIDTH = Dimensions.get('window').width;
const onPress = () => drawerOpen({ contentKey: 'SideBar' });

const menuIcon = require('../../icons/menu.png');

const SerpNavBar = ({
  activeView,
  onMapPress,
  onListPress,
}) => (
  <View style={styles.container}>
    {Platform.OS === 'ios' && (
      <LinearGradient
        style={styles.gradient}
        colors={[vars.color.red, vars.color.orange]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
      />
    )}
    <TouchableOpacity
      style={[styles.leftButton]}
      onPress={onPress}
      activeOpacity={1}
      underlayColor
    >
      <Image source={menuIcon} />
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
        paddingTop: 20,
      },
      android: {
        height: 54,
      },
    }),
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  leftButton: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
  },
  buttonsWrapper: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: vars.color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        height: 28,
        borderRadius: 4,
        top: 26,
        width: 152,
        marginLeft: (DEVICE_WIDTH / 2) - 76,
      },
      android: {
        height: 32,
        borderRadius: 50,
        top: 10,
        width: 180,
        marginLeft: (DEVICE_WIDTH / 2) - 90,
      },
    }),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        width: 76,
        height: 28,
        borderRadius: 4,
      },
      android: {
        width: 90,
        height: 32,
        borderRadius: 50,
      },
    }),
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
