// @flow

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';

import MasterCardHeader from './MasterCardHeader';
import MasterCardWorks from './MasterCardWorks';
import MasterCardServices from './MasterCardServices';
import MasterCardEquipment from './MasterCardEquipment';

import vars from '../../vars';

export default class MasterCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View>
            <Image
              source={require('../../icons/android/photo-master.png')}
              resizeMode="cover"
              style={{ height: 260, width: null }}
            />
          </View>
          <MasterCardHeader />
          <MasterCardWorks />
          <MasterCardServices />
          <MasterCardEquipment />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.bodyColor,
    alignItems: 'center',
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
});
