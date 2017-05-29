// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class MasterProfile extends Component {
  static propTypes = {};

  render() {
    return (
      <View>
        <Text>
          Профиль
        </Text>
        <Text>
          Календарь
        </Text>
        <Text>
          Услуги
        </Text>
      </View>
    );
  }
}
