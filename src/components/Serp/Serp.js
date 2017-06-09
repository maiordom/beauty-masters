// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import Map from '../../containers/Map';

export default class Serp extends Component {
  render() {
    return (
      <View>
        <Map sceneKey={this.props.sceneKey} />
      </View>
    );
  }
}
