// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
// import { Actions } from 'react-native-router-flux';

import CardHeader from './CardHeader';
import CardWorks from './CardWorks';
import CardServices from './CardServices';
import CardEquipment from './CardEquipment';

import vars from '../../vars';
// import i18n from '../../i18n';

export default class Card extends Component {
  props: {
  };

  state = {
  };

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
          <CardHeader />
          <CardWorks />
          <CardServices />
          <CardEquipment />
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
