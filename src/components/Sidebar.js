// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { drawerClose } from '../actions/drawer';

import i18n from '../i18n';
import vars from '../vars';

const icons = {
  photoEmpty: require('../icons/photo-empty-white.png'),
};

type Props = {
  firstName?: string,
  lastName?: string,
  photo?: string,
  drawerClose: Function,
  currentScene: ?string,
};

type State = {
  currentScene: ?string,
}
export default class Sidebar extends Component<void, Props, State> {
  state = {
    currentScene: this.props.currentScene,
  };

  menuButtons = [
    {
      key: 'searchForm',
      title: i18n.search.search,
      icon: {
        default: require('../icons/android/search.png'),
        active: require('../icons/android/search-active.png'),
      },
      onPress: () => {
        const nextScene = { currentScene: 'searchForm' };
        Actions.searchForm(nextScene);
        this.setState(nextScene);
        InteractionManager.runAfterInteractions(drawerClose);
      },
    },
    {
      key: 'favorite',
      title: i18n.favorites,
      icon: {
        default: require('../icons/android/star.png'),
        active: require('../icons/android/star-active.png'),
      },
      onPress: () => {
        const nextScene = { currentScene: 'favorite' };
        Actions.favorite(nextScene);
        this.setState(nextScene);
        InteractionManager.runAfterInteractions(drawerClose);
      },
    },
    {
      key: 'userAgreement',
      title: i18n.userAgreementShort,
      icon: {
        default: require('../icons/android/doc.png'),
        active: require('../icons/android/doc-active.png'),
      },
      onPress: () => {
        const nextScene = { currentScene: 'userAgreement' };
        Actions.userAgreement(nextScene);
        this.setState(nextScene);
        InteractionManager.runAfterInteractions(drawerClose);
      },
    },
    {
      key: 'feedback',
      title: i18n.feedback,
      icon: {
        default: require('../icons/android/chat.png'),
        active: require('../icons/android/chat-active.png'),
      },
      onPress: () => {
        const nextScene = { currentScene: 'feedback' };
        Actions.feedback({ ...nextScene, title: i18n.feedback });
        this.setState(nextScene);
        InteractionManager.runAfterInteractions(drawerClose);
      },
    },
  ];

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.currentScene !== this.props.currentScene) {
      this.setState({ currentScene: nextProps.currentScene });
    }
  }

  render() {
    const {
      firstName,
      lastName,
      photo,
    } = this.props;

    const { currentScene } = this.state;

    const name = firstName && lastName && `${firstName} ${lastName}`;

    return (
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <View style={styles.photoWrapper}>
            <Image style={styles.photo} source={photo || icons.photoEmpty} />
          </View>
          <Text style={styles.title}>{name || i18n.authAsMaster}</Text>
        </View>
        <View style={styles.menu}>
          {this.menuButtons.map(button => (
            <TouchableOpacity onPress={button.onPress} key={button.title}>
              <View style={styles.button}>
                {Platform.OS === 'android' && (
                  <Image
                    style={styles.icon}
                    source={currentScene === button.key ? button.icon.active : button.icon.default}
                  />
                )}
                <Text
                  style={[
                    styles.text,
                    { color: currentScene === button.key ? vars.color.blue : null },
                  ]}
                >
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
    width: Dimensions.get('window').width - 50,
  },
  header: {
    backgroundColor: vars.color.red,
    paddingLeft: 16,
  },
  photoWrapper: {
    marginTop: 40,
  },
  photo: {
    width: 64,
    height: 64,
  },
  title: {
    marginTop: 36,
    marginBottom: 16,
    color: vars.color.white,
  },
  button: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
  },
  text: {
    marginLeft: 32,
  },
  menu: {
    paddingTop: 10,
  },
});
