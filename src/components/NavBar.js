import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { drawerOpen } from '../actions/drawer';
import vars from '../vars';

const DEVICE_WIDTH = Dimensions.get('window').width;

const getBackButtonImage = (leftButtonMenu) => {
  if (leftButtonMenu) {
    return require('../icons/menu.png');
  }

  return require('../icons/android/back-arrow.png');
};

class NavBar extends React.Component {
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

    return (
      <View style={styles.container}>
        {!leftButtonHidden && (<TouchableOpacity
          style={[styles.leftButton, leftButtonStyle]}
          onPress={onLeftButtonPress}
        >
          <Image style={leftButtonIconStyle} source={backButtonImage || getBackButtonImage(leftButtonMenu)} />
        </TouchableOpacity>)}
        <Text
          style={[styles.title, leftButtonHidden
            ? { width: DEVICE_WIDTH - (16 * 2), marginLeft: 16 }
            : { width: DEVICE_WIDTH - 20 - (16 * 2) - 16 },
          ]}
          lineBreakMode="tail"
          numberOfLines={1}
        >{title}</Text>
      </View>
    );
  }
}

// Declare only one React component per file
// eslint-disable-next-line
const Scene = component => class SceneComponent extends React.Component {
  onLeftButtonPress = () => {
    const { leftButtonMenu, onLeftButtonPress } = this.props;

    if (onLeftButtonPress) {
      onLeftButtonPress();
    }

    if (leftButtonMenu) {
      return drawerOpen({
        contentKey: 'SideBar',
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
      },
      android: {
        height: 54,
      },
    }),
  },
  title: {
    color: vars.color.white,
    fontSize: 20,
    alignSelf: 'center',
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
