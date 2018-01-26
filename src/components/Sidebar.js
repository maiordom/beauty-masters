// @flow

import React, { Component } from 'react';
import {
  Image,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import i18n from '../i18n';
import vars from '../vars';

const icons = Platform.select({
  ios: {
    photoEmpty: require('../icons/ios/empty-avatar.png'),
    logout: require('../icons/logout-icon.png'),
  },
  android: {
    photoEmpty: require('../icons/photo-empty-white.png'),
    logout: require('../icons/logout-icon.png'),
  },
});

type TProps = {
  avatar?: string,
  actions: Object,
  currentScene: ?string,
  username?: string,
  isAuthorized: boolean,
};

type TState = {
  currentScene: ?string,
}

export default class Sidebar extends Component<TProps, TState> {
  state = {
    currentScene: this.props.currentScene,
  };

  changeScene = (key: string) => {
    const nextScene = { currentScene: key };

    this.props.actions.drawerClose();

    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        Actions[key](nextScene);
        this.setState(nextScene);
      }, 150);
    });
  };

  menuButtons = [
    {
      key: 'searchForm',
      title: i18n.search.search,
      icon: {
        default: require('../icons/android/search.png'),
        active: require('../icons/android/search-active.png'),
      },
      onPress: () => this.changeScene('searchForm'),
    },
    {
      key: 'favorite',
      title: i18n.favorites,
      icon: {
        default: require('../icons/android/star.png'),
        active: require('../icons/android/star-active.png'),
      },
      onPress: () => this.changeScene('favorite'),
    },
    {
      key: 'userAgreement',
      title: i18n.userAgreementShort,
      icon: {
        default: require('../icons/android/doc.png'),
        active: require('../icons/android/doc-active.png'),
      },
      onPress: () => this.changeScene('userAgreement'),
    },
    {
      key: 'feedback',
      title: i18n.feedback,
      icon: {
        default: require('../icons/android/chat.png'),
        active: require('../icons/android/chat-active.png'),
      },
      onPress: () => this.changeScene('feedback'),
    },
  ];

  componentWillReceiveProps(nextProps: TProps) {
    if (nextProps.currentScene !== this.props.currentScene) {
      this.setState({ currentScene: nextProps.currentScene });
    }
  }

  onAvatarPress = () => {
    this.props.actions.drawerClose();

    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        if (this.props.isAuthorized) {
          this.props.actions.routeToMasterProfile();
        } else {
          this.props.actions.routeToAuthorization();
        }
      }, 150);
    });
  };

  onLogoutPress = () => {
    this.props.actions.drawerClose();
    this.props.actions.logout();
  };

  render() {
    const {
      avatar,
      username,
      isAuthorized,
    } = this.props;

    const { currentScene } = this.state;
    const avatarSource = avatar ? { uri: avatar } : icons.photoEmpty;

    return (
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.onAvatarPress}>
            <View style={styles.avatarWrapper}>
              <Image style={styles.avatar} source={avatarSource} />
            </View>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.titleTouchable} onPress={this.onAvatarPress}>
              <Text style={[styles.title, isAuthorized ? styles.authorizedTitle : null]} numberOfLines={1}>
                {username || i18n.authAsMaster}
              </Text>
            </TouchableOpacity>
            {isAuthorized && (
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={this.onLogoutPress}
                hitSlop={{
                  top: 10, left: 10, right: 10, bottom: 10,
                }}
              >
                <Image source={icons.logout} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.menu}>
          {this.menuButtons.map((button) => (
            <TouchableOpacity onPress={button.onPress} key={button.title}>
              <View style={[styles.button, currentScene === button.key ? styles.selectedButton : null]}>
                {Platform.OS === 'android' && (
                  <View style={styles.iconWrapper}>
                    <Image
                      source={currentScene === button.key
                        ? button.icon.active
                        : button.icon.default
                      }
                    />
                  </View>
                )}
                <Text style={[styles.text, currentScene === button.key ? styles.selectedText : null]}>
                  {button.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: vars.color.white,
  },
  header: {
    ...Platform.select({
      ios: {
        backgroundColor: vars.color.black,
        paddingLeft: 24,
      },
      android: {
        backgroundColor: vars.color.red,
        paddingLeft: 16,
      },
    }),
  },
  avatarWrapper: {
    marginTop: 40,
    borderRadius: 50,
    width: 64,
    height: 64,
    overflow: 'hidden',
  },
  avatar: {
    width: 64,
    height: 64,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTouchable: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    color: vars.color.white,
    ...Platform.select({
      ios: {
        fontSize: 14,
        marginTop: 30,
        marginBottom: 30,
      },
      android: {
        marginTop: 36,
        marginBottom: 16,
      },
    }),
  },
  authorizedTitle: {
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
    }),
  },
  logoutButton: {
    marginRight: 10,
    height: 40,
    width: 40,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
      },
      android: {
        justifyContent: 'flex-end',
        paddingBottom: 2,
      },
    }),
  },
  button: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  selectedButton: {
    ...Platform.select({
      ios: {
        backgroundColor: vars.color.lightGrey,
      },
    }),
  },
  iconWrapper: {
    width: 25,
    marginLeft: 16,
  },
  text: {
    ...Platform.select({
      ios: {
        marginLeft: 24,
        fontSize: 17,
        color: vars.color.black,
      },
      android: {
        marginLeft: 20,
      },
    }),
  },
  selectedText: {
    ...Platform.select({
      android: {
        color: vars.color.blue,
      },
    }),
  },
  menu: {
    ...Platform.select({
      ios: {
        paddingTop: 24,
      },
      android: {
        paddingTop: 10,
      },
    }),
  },
});
