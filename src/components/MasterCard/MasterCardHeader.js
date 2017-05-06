// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import vars from '../../vars';

export default class MasterCardHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Елена Трепышина</Text>
            <Image
              source={require('../../icons/verified.png')}
              style={{ height: 16, width: 16, marginLeft: 6 }}
            />
          </View>
          <Text style={styles.subtitle}>Салон «Пилки»</Text>
        </View>
        <View style={styles.socials}>
          <Image
            source={require('../../icons/social/vk.png')}
            style={{ height: 28, width: 28, marginRight: 16 }}
          />
          <Image
            source={require('../../icons/social/inst.png')}
            style={{ height: 28, width: 28 }}
          />
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
  subtitle: {
    fontSize: 16,
  },
  socials: {
    flexDirection: 'row',
  },
});
