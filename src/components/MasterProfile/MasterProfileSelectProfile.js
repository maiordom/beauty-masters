// @flow

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import Radio from '../Radio';
import ButtonControl from '../ButtonControl';

import vars from '../../vars';
import i18n from '../../i18n';

type TProps = {
  actions: {
    selectMainMaster: (index: number) => void,
  },
  items: Array<{
    avatar: null | string,
    username: string,
    isMain: boolean,
  }>
};

const avatarEmpty = require('../../icons/photo-empty.png');

export default class MasterProfileSelectProfile extends Component<void, TProps, void> {
  onSelectMaster = (index: number) => {
    if (!this.props.items[index].isMain) {
      this.props.actions.selectMainMaster(index);
    }
  };

  render() {
    const { items } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.inner}>
          {items.map((item, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => this.onSelectMaster(index)}>
              <View style={styles.item}>
                <View style={styles.userInfo}>
                  <Image style={styles.avatar} source={item.avatar || avatarEmpty} />
                  <View>
                    <Text style={styles.username}>{item.username}</Text>
                    {item.isMain && (
                      <Text style={styles.masterActive}>{i18n.activeMaster}</Text>
                    )}
                  </View>
                </View>
                <Radio checked={item.isMain} />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
        <ButtonControl label={i18n.addMasterCard} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  avatar: {
    width: 28,
    height: 28,
    marginRight: 16,
    marginLeft: 16,
  },
  username: {
    fontSize: 16,
    color: vars.color.black,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  masterActive: {
    fontSize: 14,
    color: vars.color.red,
  },
  item: {
    paddingRight: 14,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        height: 44,
      },
      android: {
        height: 48,
      },
    })
  },
});
