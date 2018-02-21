// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Radio from '../Radio';
import ButtonControl from '../ButtonControl';

import vars from '../../vars';
import i18n from '../../i18n';

type TProps = {
  actions: Object,
  items: Array<{
    avatar: null | string,
    username: string,
    isMain: boolean,
  }>
};

const avatarEmpty = require('../../icons/photo-empty.png');

export default class MasterProfileSelectProfile extends PureComponent<TProps, void> {
  onSelectMaster = (index: number) => {
    if (!this.props.items[index].isMain) {
      this.props.actions.selectMainMaster(index);
    }
  };

  onAddMasterCardPress = () => {
    this.props.actions.refreshEditor();
    this.props.actions.routeToCreateMasterCard();
  }

  render() {
    const { items } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.inner}>
          {items.map((item, index) => {
            const { avatar } = item;
            const avatarSource = avatar ? { uri: avatar } : avatarEmpty;

            return (
              <TouchableOpacity key={index} onPress={() => this.onSelectMaster(index)}>
                <View style={styles.item}>
                  <View style={styles.userInfo}>
                    <View style={styles.avatarWrapper}>
                      <Image style={styles.avatar} source={avatarSource} />
                    </View>
                    <View>
                      <Text style={styles.username}>{item.username}</Text>
                      {item.isMain && (
                        <Text style={styles.masterActive}>{i18n.activeMaster}</Text>
                      )}
                    </View>
                  </View>
                  <Radio checked={item.isMain} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ButtonControl
          onPress={this.onAddMasterCardPress}
          label={i18n.addMasterCard}
        />
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
    ...Platform.select({
      android: {
        borderRadius: 50,
      },
    }),
  },
  avatarWrapper: {
    width: 28,
    height: 28,
    marginRight: 16,
    ...Platform.select({
      ios: {
        borderRadius: 50,
        overflow: 'hidden',
      },
    }),
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
    paddingLeft: 14,
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
    }),
  },
});
