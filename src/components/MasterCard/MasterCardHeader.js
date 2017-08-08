// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import vars from '../../vars';
import i18n from '../../i18n';

const icons = {
  verified: require('../../icons/verified.png'),
  vk: require('../../icons/social/vk.png'),
  inst: require('../../icons/social/inst.png'),
};

type TProps = {
  username?: string,
  isSalon: boolean,
  salonName?: string,
  vkProfile?: string,
  inProfile?: string,
  isVerified?: boolean,
}

export default class MasterCardHeader extends Component<void, TProps, void> {
  render() {
    const {
      inProfile,
      isSalon,
      isVerified,
      salonName,
      username,
      vkProfile,
    } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{username}</Text>
            {isVerified && (
              <Image source={icons.verified} style={styles.verified} />
            )}
          </View>
          {isSalon && (
            <Text style={styles.subtitle}>{i18n.salon} «{salonName}»</Text>
          )}
        </View>
        <View style={styles.socials}>
          {vkProfile && (
            <Image source={icons.vk} style={[styles.socialIcon, styles.socialIconMargin]} />
          )}
          {inProfile && (
            <Image source={icons.inst} style={styles.socialIcon} />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 16,
    paddingBottom: 16,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: vars.color.lightGrey,
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: vars.color.black,
  },
  verified: {
    height: 16,
    width: 16,
    marginLeft: 6,
  },
  subtitle: {
    fontSize: 16,
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
