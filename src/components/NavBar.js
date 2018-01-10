import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

import { drawerOpen } from '../actions/Drawer';
import vars from '../vars';

const icons = {
  menu: require('../icons/menu.png'),
  ...Platform.select({
    ios: {
      backArrow: require('../icons/ios/back-arrow.png'),
    },
    android: {
      backArrow: require('../icons/android/back-arrow.png'),
    },
  }),
};

const getBackButtonImage = (leftButtonMenu) => {
  if (leftButtonMenu) {
    return icons.menu;
  }

  return icons.backArrow;
};

class NavBar extends Component {
  render() {
    const {
      backButtonImage,
      leftButtonHidden,
      leftButtonIconStyle,
      leftButtonMenu,
      leftButtonStyle,
      onLeftButtonPress,
      onRightButtonPress,
      rightButtonImage,
      title,
    } = this.props;

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && (
          <LinearGradient
            style={styles.gradient}
            colors={[vars.color.red, vars.color.orange]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
          />
        )}
        {!leftButtonHidden && (
          <TouchableOpacity
            style={[styles.leftButton, leftButtonStyle]}
            onPress={onLeftButtonPress}
          >
            <Image
              style={leftButtonIconStyle}
              source={backButtonImage || getBackButtonImage(leftButtonMenu)}
            />
          </TouchableOpacity>)}
        <Text
          style={[
            styles.title,
            Platform.OS === 'android' && [
              leftButtonHidden && { marginLeft: 16 },
              !rightButtonImage && { marginRight: 16 },
            ],
          ]}
          lineBreakMode="tail"
          numberOfLines={1}
        >{title}
        </Text>
        {rightButtonImage && (
          <TouchableOpacity
            style={styles.rightButton}
            onPress={onRightButtonPress}
          >
            <Image
              source={rightButtonImage}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

// Declare only one React component per file
// eslint-disable-next-line
const Scene = (component) => class SceneComponent extends Component {
  onLeftButtonPress = () => {
    const {
      leftButtonMenu,
      onLeftButtonPress,
      sceneKey,
    } = this.props;

    if (onLeftButtonPress) {
      return onLeftButtonPress();
    }

    if (leftButtonMenu) {
      return drawerOpen({
        contentKey: 'SideBar',
        currentScene: sceneKey,
        openDrawerOffset: 0.125,
      });
    }

    Actions.pop();
  };

  onRightButtonPress = () => {
    const { onRightButtonPress } = this.props;

    if (onRightButtonPress) {
      onRightButtonPress();
    }
  }

  render() {
    return (
      <View style={styles.scene}>
        <NavBar
          {...this.props}
          onLeftButtonPress={this.onLeftButtonPress}
          onRightButtonPress={this.onRightButtonPress}
        />
        {React.createElement(component, this.props)}
      </View>
    );
  }
};

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
    }),
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
  title: {
    backgroundColor: 'transparent',
    color: vars.color.white,
    flex: 1,
    ...Platform.select({
      ios: {
        textAlign: 'center',
        fontSize: 17,
        position: 'absolute',
        top: 32,
        left: 44,
        right: 44,
      },
      android: {
        alignSelf: 'center',
        fontSize: 20,
      },
    }),
  },
  leftButton: {
    padding: 16,
    justifyContent: 'center',
  },
  rightButton: {
    padding: 16,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 320,
    backgroundColor: vars.color.red,
  },
});

export default Scene;
