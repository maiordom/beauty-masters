// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Platform, TouchableOpacity } from 'react-native';

import vars from '../../vars';
import i18n from '../../i18n';

const icons = {
  vk: require('../../icons/social/vk.png'),
  inst: require('../../icons/social/inst.png'),
};

type TProps = {
  username?: string,
  isSalon: boolean,
  salonName?: string,
  vkProfile?: string,
  inProfile?: string,
  onSocialIconTap?: (url: String) => void,
}

export default class MasterCardHeader extends Component<TProps, void> {
  onSocialIconTap = (url?: string) => {
    const callback = this.props.onSocialIconTap;
    if (url !== undefined && callback) {
      callback(url);
    }
  };

  render() {
    const {
      inProfile,
      isSalon,
      salonName,
      username,
      vkProfile,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title} numberOfLines={1}>{username}</Text>
          </View>
          {isSalon && (
            <Text style={styles.subtitle}>{i18n.salon} «{salonName}»</Text>
          )}
        </View>
        <View style={styles.socials}>
          {vkProfile ? (
            <TouchableOpacity onPress={() => this.onSocialIconTap(vkProfile)}>
              <Image source={icons.vk} style={[styles.socialIcon, styles.socialIconMargin]} />
            </TouchableOpacity>
          ) : null}
          {inProfile ? (
            <TouchableOpacity onPress={() => this.onSocialIconTap(inProfile)}>
              <Image source={icons.inst} style={styles.socialIcon} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: vars.color.lightGrey,
    ...Platform.select({
      ios: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
      },
      android: {
        margin: 16,
        marginBottom: 0,
        paddingBottom: 12,
      },
    }),
  },
  titleContainer: {
    flex: 1,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: vars.color.black,
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        fontSize: 20,
      },
    }),
  },
  subtitle: {
    ...Platform.select({
      ios: {
        fontSize: 12,
        color: vars.color.grey,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
  socials: {
    flexDirection: 'row',
  },
  socialIcon: {
    height: 28,
    width: 28,
  },
  socialIconMargin: {
    marginRight: 16,
  },
});
