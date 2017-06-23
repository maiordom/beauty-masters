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

const menuButtons = [
  {
    key: 'searchForm',
    title: i18n.search.search,
    icon: require('../icons/android/search.png'),
    onPress: () => {
      Actions.searchForm();
      InteractionManager.runAfterInteractions(drawerClose);
    },
  },
  {
    key: 'favorite',
    title: i18n.favorites,
    icon: require('../icons/android/star-active.png'),
    onPress: () => {
      Actions.favorite();
      InteractionManager.runAfterInteractions(drawerClose);
    },
  },
  {
    key: 'userAgreement',
    title: i18n.userAgreementShort,
    icon: require('../icons/android/doc.png'),
    onPress: Actions.userAgreement,
  },
  {
    key: 'feedback',
    title: i18n.feedback,
    icon: require('../icons/android/chat.png'),
    onPress: Actions.feedback,
  },
];

type Props = {
  firstName?: string,
  lastName?: string,
  photo?: string,
  drawerClose: Function,
};

export default class ModalComponent extends Component<void, Props, void> {
  render() {
    const {
      firstName,
      lastName,
      photo,
    } = this.props;

    const name = firstName && lastName && `${firstName} ${lastName}`;
    const activeKey = 'favorite';

    return (
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <View style={styles.photoWrapper}>
            <Image style={styles.photo} source={photo || icons.photoEmpty} />
          </View>
          <Text style={styles.title}>{name || i18n.authAsMaster}</Text>
        </View>
        <View style={styles.menu}>
          {menuButtons.map(button => (
            <TouchableOpacity onPress={button.onPress} key={button.title}>
              <View style={styles.button}>
                {Platform.OS === 'android' && (
                  <Image style={styles.icon} source={button.icon} />
                )}
                <Text
                  style={[
                    styles.text,
                    { color: activeKey === button.key ? vars.color.blue : null },
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
