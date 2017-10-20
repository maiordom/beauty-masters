import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { drawerOpen } from '../actions/Drawer';
import vars from '../vars';

const DEVICE_WIDTH = Dimensions.get('window').width;

const getBackButtonImage = (leftButtonMenu) => {
  if (leftButtonMenu) {
    return require('../icons/menu.png');
  }

  return require('../icons/android/back-arrow.png');
};

class NavBar extends Component {
  render() {
    const {
      backButtonImage,
      leftButtonHidden,
      leftButtonIconStyle,
      leftButtonStyle,
      leftButtonMenu,
      title,
      onLeftButtonPress,
    } = this.props;

    const titleCustomStyle = Platform.select({
      ios: leftButtonHidden
        ? { marginLeft: 16, marginRight: 16 }
        : { marginLeft: 16 * 2 + 20, marginRight: 16 * 2 + 20 },
      android: leftButtonHidden
        ? { width: DEVICE_WIDTH - (16 * 2), marginLeft: 16 }
        : { width: DEVICE_WIDTH - 20 - (16 * 2) - 16 },
    });

    return (
      <View style={styles.container}>
        {
          Platform.OS === 'ios' && (
            <LinearGradient
              style={styles.gradient}
              colors={[vars.color.red, vars.color.orange]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
            />
          )
        }
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
          style={[styles.title, titleCustomStyle]}
          lineBreakMode="tail"
          numberOfLines={1}
        >{title}</Text>
      </View>
    );
  }
}

// Declare only one React component per file
// eslint-disable-next-line
const Scene = component => class SceneComponent extends Component {
  onLeftButtonPress = () => {
    const {
      leftButtonMenu,
      onLeftButtonPress,
      sceneKey,
    } = this.props;

    if (onLeftButtonPress) {
      onLeftButtonPress();
    }

    if (leftButtonMenu) {
      return drawerOpen({
        contentKey: 'SideBar',
        currentScene: sceneKey,
      });
    }

    Actions.pop();
  };

  render() {
    return (
      <View style={styles.scene}>
        <NavBar {...this.props} onLeftButtonPress={this.onLeftButtonPress} />
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
    color: vars.color.white,
    backgroundColor: 'transparent',
    fontSize: 20,
    ...Platform.select({
      ios: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        marginLeft: 32,
        marginRight: 32,
        paddingTop: 12,
        fontSize: 17,
        fontWeight: '600',
      },
      android: {
        alignSelf: 'center',
      },
    }),
  },
  leftButton: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
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
